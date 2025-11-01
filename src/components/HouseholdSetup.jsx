import React, { useState } from 'react';
import { X, Plus, Users } from 'lucide-react';
import Button from './Button';
import { getMemberColor } from '../utils/colors';

const HouseholdSetup = ({ members, onMembersChange, onNext }) => {
  const [newMemberName, setNewMemberName] = useState('');
  const [error, setError] = useState('');

  const handleAddMember = () => {
    if (!newMemberName.trim()) {
      setError('Please enter a name');
      return;
    }

    if (members.some(m => m.name.toLowerCase() === newMemberName.toLowerCase())) {
      setError('This name already exists');
      return;
    }

    const newMember = {
      id: Date.now(),
      name: newMemberName.trim(),
      color: getMemberColor(members.length).hex
    };

    onMembersChange([...members, newMember]);
    setNewMemberName('');
    setError('');
  };

  const handleRemoveMember = (memberId) => {
    onMembersChange(members.filter(m => m.id !== memberId));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddMember();
    }
  };

  const canProceed = members.length > 0;

  return (
    <div className="max-w-2xl mx-auto p-8 animate-slide-up">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-ios-blue/10 rounded-full mb-4">
          <Users className="w-8 h-8 text-ios-blue" />
        </div>
        <h1 className="text-4xl font-light text-neutral-text-primary mb-2">
          Who lives in your household?
        </h1>
        <p className="text-lg text-neutral-text-secondary">
          Add everyone who will share household tasks
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-ios border border-neutral-border p-6 mb-6 shadow-sm">
        <div className="flex gap-3">
          <input
            type="text"
            value={newMemberName}
            onChange={(e) => {
              setNewMemberName(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            placeholder="Enter name..."
            className="flex-1 px-4 py-3 border border-neutral-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ios-blue focus:border-transparent transition-all"
            maxLength={30}
          />
          <Button
            onClick={handleAddMember}
            icon={<Plus className="w-5 h-5" />}
            size="md"
          >
            Add
          </Button>
        </div>
        {error && (
          <p className="text-ios-red text-sm mt-2">{error}</p>
        )}
      </div>

      {/* Members List */}
      {members.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-neutral-text-primary">
              Household Members
            </h3>
            <span className="text-sm text-neutral-text-secondary">
              {members.length} {members.length === 1 ? 'member' : 'members'}
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {members.map((member, index) => (
              <div
                key={member.id}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-medium shadow-sm animate-fade-in"
                style={{ backgroundColor: member.color }}
              >
                <span>{member.name}</span>
                <button
                  onClick={() => handleRemoveMember(member.id)}
                  className="hover:opacity-80 transition-opacity"
                  aria-label={`Remove ${member.name}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {members.length === 0 && (
        <div className="text-center py-12 text-neutral-text-secondary">
          <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No members added yet</p>
          <p className="text-sm mt-1">Add at least one member to continue</p>
        </div>
      )}

      {/* Next Button */}
      <div className="flex justify-end pt-6 border-t border-neutral-border">
        <Button
          onClick={onNext}
          disabled={!canProceed}
          size="lg"
        >
          Continue to Tasks
        </Button>
      </div>
    </div>
  );
};

export default HouseholdSetup;
