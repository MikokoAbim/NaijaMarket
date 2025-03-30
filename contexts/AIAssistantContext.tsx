import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CommandStep {
  action: 'find_product' | 'add_to_cart' | 'checkout' | 'navigate' | 'search';
  completed: boolean;
  data?: any;
}

interface AIAssistantState {
  isOpen: boolean;
  conversation: {
    id: string;
    messages: any[];
  };
  commandStack: CommandStep[];
  preferences: string[];
  viewHistory: number[];
  searchHistory: string[];
}

interface AIAssistantContextType {
  isOpen: boolean;
  openAssistant: () => void;
  closeAssistant: () => void;
  addMessage: (message: any) => void;
  conversation: {
    id: string;
    messages: any[];
  };
  commandStack: CommandStep[];
  startCommand: (steps: CommandStep[]) => void;
  completeCommandStep: (index: number, data?: any) => void;
  resetCommand: () => void;
  addPreference: (preference: string) => void;
  recordProductView: (productId: number) => void;
  recordSearch: (searchTerm: string) => void;
  userPreferences: string[];
  viewHistory: number[];
  searchHistory: string[];
}

const AIAssistantContext = createContext<AIAssistantContextType | undefined>(undefined);

export function AIAssistantProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AIAssistantState>({
    isOpen: false,
    conversation: {
      id: 'conv-' + Date.now(),
      messages: [],
    },
    commandStack: [],
    preferences: [],
    viewHistory: [],
    searchHistory: [],
  });

  const openAssistant = () => {
    setState(prev => ({ ...prev, isOpen: true }));
  };

  const closeAssistant = () => {
    setState(prev => ({ ...prev, isOpen: false }));
  };

  const addMessage = (message: any) => {
    setState(prev => ({
      ...prev,
      conversation: {
        ...prev.conversation,
        messages: [...prev.conversation.messages, message],
      },
    }));
  };

  const startCommand = (steps: CommandStep[]) => {
    setState(prev => ({
      ...prev,
      commandStack: steps,
    }));
  };

  const completeCommandStep = (index: number, data?: any) => {
    setState(prev => {
      const updatedStack = [...prev.commandStack];
      if (updatedStack[index]) {
        updatedStack[index] = {
          ...updatedStack[index],
          completed: true,
          data,
        };
      }
      return {
        ...prev,
        commandStack: updatedStack,
      };
    });
  };

  const resetCommand = () => {
    setState(prev => ({
      ...prev,
      commandStack: [],
    }));
  };

  const addPreference = (preference: string) => {
    setState(prev => {
      // Only add if not already in preferences
      if (!prev.preferences.includes(preference)) {
        return {
          ...prev,
          preferences: [...prev.preferences, preference],
        };
      }
      return prev;
    });
  };

  const recordProductView = (productId: number) => {
    setState(prev => ({
      ...prev,
      viewHistory: [productId, ...prev.viewHistory].slice(0, 20), // Keep last 20
    }));
  };

  const recordSearch = (searchTerm: string) => {
    setState(prev => ({
      ...prev,
      searchHistory: [searchTerm, ...prev.searchHistory].slice(0, 10), // Keep last 10
    }));
  };

  return (
    <AIAssistantContext.Provider
      value={{
        isOpen: state.isOpen,
        openAssistant,
        closeAssistant,
        addMessage,
        conversation: state.conversation,
        commandStack: state.commandStack,
        startCommand,
        completeCommandStep,
        resetCommand,
        addPreference,
        recordProductView,
        recordSearch,
        userPreferences: state.preferences,
        viewHistory: state.viewHistory,
        searchHistory: state.searchHistory,
      }}
    >
      {children}
    </AIAssistantContext.Provider>
  );
}

export function useAIAssistant() {
  const context = useContext(AIAssistantContext);
  if (context === undefined) {
    throw new Error('useAIAssistant must be used within an AIAssistantProvider');
  }
  return context;
} 