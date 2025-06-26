import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { TranslationTooltip } from './TranslationTooltip';

export type Theme = 'animals' | 'food' | 'months' | 'clothing' | 'colors' | 'numbers' | 'sports' | 'transportation' | 'days' | 'house';

interface ThemeSelectorProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ theme, setTheme }) => {
  const themes: { value: Theme; label: string; emoji: string; spanish: string }[] = [
    { value: 'animals', label: 'Animals', emoji: '🐾', spanish: 'Animales' },
    { value: 'food', label: 'Food', emoji: '🍎', spanish: 'Comida' },
    { value: 'months', label: 'Months', emoji: '📅', spanish: 'Meses' },
    { value: 'clothing', label: 'Clothing', emoji: '👕', spanish: 'Ropa' },
    { value: 'colors', label: 'Colors', emoji: '🌈', spanish: 'Colores' },
    { value: 'numbers', label: 'Numbers', emoji: '🔢', spanish: 'Números' },
    { value: 'sports', label: 'Sports', emoji: '⚽', spanish: 'Deportes' },
    { value: 'transportation', label: 'Transportation', emoji: '🚗', spanish: 'Transporte' },
    { value: 'days', label: 'Days', emoji: '📆', spanish: 'Días' },
    { value: 'house', label: 'House', emoji: '🏠', spanish: 'Casa' },
  ];

  const selectedTheme = themes.find(t => t.value === theme);

  return (
    <div className="flex-1">
      <TranslationTooltip spanish="Tema" english="Theme">
        <h3 className="text-lg font-bold text-amber-800 mb-3 font-mono cursor-help">Theme</h3>
      </TranslationTooltip>
      <Select value={theme} onValueChange={(value: Theme) => setTheme(value)}>
        <SelectTrigger className="w-full bg-gradient-to-r from-orange-100 to-red-100 border-2 border-red-400 rounded-lg font-bold text-red-700 font-mono">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-red-400 rounded-lg">
          {themes.map(({ value, label, emoji, spanish }) => (
            <TranslationTooltip key={value} spanish={spanish} english={label}>
              <SelectItem 
                value={value}
                className="font-bold text-red-700 hover:bg-red-100 font-mono cursor-help"
              >
                {emoji} {label}
              </SelectItem>
            </TranslationTooltip>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
