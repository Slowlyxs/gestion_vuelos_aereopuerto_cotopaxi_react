// src/presentation/store/profile.store.ts

import { create } from "zustand";

interface ProfileState {
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
}

interface ProfileActions {
  fetchProfile(): Promise<void>;
  updateProfile(): Promise<void>;
  clearProfile(): void;
  clearError(): void;
}

export const useProfileStore = create<ProfileState & ProfileActions>((set) => ({
  isLoading: false,
  isSaving: false,
  error: null,

  async fetchProfile() {
    console.warn("Módulo de perfil no implementado.");
  },

  async updateProfile() {
    console.warn("Módulo de perfil no implementado.");
  },

  clearProfile() {
    set({ error: null });
  },

  clearError() {
    set({ error: null });
  },
}));