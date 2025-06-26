import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type Difficulty = 'easy' | 'medium' | 'difficult' | 'impossible';
type QuizType = 'mixing' | 'hex' | 'opposites';

interface ColorQuizProps {
  onAddScore: (points: number) => void;
}

export const ColorQuiz: React.FC<ColorQuizProps> = ({ onAddScore }) => {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [quizType, setQuizType] = useState<QuizType>('mixing');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [answerSelected, setAnswerSelected] = useState(false);

  // Color mapping for opposites quiz
  const colorHexMap: { [key: string]: string } = {
    'Red': '#FF0000', 'Green': '#00FF00', 'Blue': '#0000FF', 'Yellow': '#FFFF00',
    'Orange': '#FFA500', 'Purple': '#800080', 'Pink': '#FFC0CB', 'Cyan': '#00FFFF',
    'Magenta': '#FF00FF', 'Lime': '#00FF00', 'Teal': '#008080', 'Coral': '#FF7F50',
    'Maroon': '#800000', 'Mint': '#98FB98', 'Navy': '#000080', 'Peach': '#FFCBA4',
    'Olive': '#808000', 'Lavender': '#E6E6FA', 'Salmon': '#FA8072', 'Turquoise': '#40E0D0',
    'Indigo': '#4B0082', 'Gold': '#FFD700', 'Crimson': '#DC143C', 'Chartreuse': '#7FFF00',
    'Plum': '#DDA0DD', 'Periwinkle': '#CCCCFF', 'Burgundy': '#800020', 'Sage': '#9CAF88',
    'Vermillion': '#E34234', 'Celadon': '#ACE1AF', 'Ultramarine': '#4166F5', 'Amber': '#FFBF00',
    'Cadmium': '#FF6103', 'Prussian': '#003153', 'Alizarin': '#E32636', 'Viridian': '#40826D',
    'Burnt Sienna': '#E97451', 'Cerulean': '#007BA7', 'Raw Umber': '#826644', 'Titanium': '#EAEAE0',
    'Quinacridone': '#8E3A59', 'Phthalo': '#123524', 'Dioxazine': '#4C0080', 'Aureolin': '#FDEE00',
    'Manganese': '#9370DB', 'Cobalt Violet': '#8C69C5', 'Sap Green': '#507D2A'
  };

  const colorMixQuestions = {
    easy: [
      { hex: '#800080', color1: 'Red', color2: 'Blue', options: ['Red + Blue', 'Yellow + Blue', 'Red + Green', 'Blue + Green'], correct: 'Red + Blue' },
      { hex: '#FFA500', color1: 'Red', color2: 'Yellow', options: ['Blue + Yellow', 'Red + Yellow', 'Green + Red', 'Purple + Yellow'], correct: 'Red + Yellow' },
      { hex: '#008000', color1: 'Blue', color2: 'Yellow', options: ['Red + Blue', 'Blue + Yellow', 'Red + Yellow', 'Purple + Green'], correct: 'Blue + Yellow' },
      { hex: '#FF69B4', color1: 'Red', color2: 'White', options: ['Red + White', 'Pink + Blue', 'Purple + Yellow', 'Orange + Green'], correct: 'Red + White' },
      { hex: '#40E0D0', color1: 'Blue', color2: 'Green', options: ['Blue + Green', 'Red + Blue', 'Yellow + Green', 'Purple + Pink'], correct: 'Blue + Green' },
      { hex: '#8B4513', color1: 'Red', color2: 'Black', options: ['Red + Black', 'Brown + White', 'Orange + Purple', 'Yellow + Blue'], correct: 'Red + Black' },
      { hex: '#FFB6C1', color1: 'Red', color2: 'White', options: ['Red + White', 'Pink + Yellow', 'Purple + Green', 'Blue + Orange'], correct: 'Red + White' },
      { hex: '#90EE90', color1: 'Green', color2: 'White', options: ['Green + White', 'Blue + Yellow', 'Red + Green', 'Purple + Pink'], correct: 'Green + White' },
      { hex: '#DDA0DD', color1: 'Purple', color2: 'White', options: ['Purple + White', 'Red + Blue', 'Yellow + Purple', 'Green + Pink'], correct: 'Purple + White' },
      { hex: '#F0E68C', color1: 'Yellow', color2: 'Green', options: ['Yellow + Green', 'Blue + Red', 'Purple + Orange', 'Pink + Brown'], correct: 'Yellow + Green' }
    ],
    medium: [
      { hex: '#DC143C', color1: 'Red', color2: 'Magenta', options: ['Red + Magenta', 'Blue + Yellow', 'Green + Purple', 'Orange + Pink'], correct: 'Red + Magenta' },
      { hex: '#4169E1', color1: 'Blue', color2: 'Purple', options: ['Blue + Purple', 'Red + Green', 'Yellow + Orange', 'Pink + Brown'], correct: 'Blue + Purple' },
      { hex: '#32CD32', color1: 'Green', color2: 'Yellow', options: ['Green + Yellow', 'Blue + Red', 'Purple + Orange', 'Pink + Black'], correct: 'Green + Yellow' },
      { hex: '#FF1493', color1: 'Red', color2: 'Pink', options: ['Red + Pink', 'Blue + Yellow', 'Green + Purple', 'Orange + Brown'], correct: 'Red + Pink' },
      { hex: '#00CED1', color1: 'Cyan', color2: 'Blue', options: ['Cyan + Blue', 'Red + Green', 'Yellow + Purple', 'Orange + Pink'], correct: 'Cyan + Blue' },
      { hex: '#9932CC', color1: 'Purple', color2: 'Magenta', options: ['Purple + Magenta', 'Red + Blue', 'Green + Yellow', 'Orange + Pink'], correct: 'Purple + Magenta' },
      { hex: '#FF6347', color1: 'Red', color2: 'Orange', options: ['Red + Orange', 'Blue + Yellow', 'Green + Purple', 'Pink + Brown'], correct: 'Red + Orange' },
      { hex: '#4682B4', color1: 'Blue', color2: 'Gray', options: ['Blue + Gray', 'Red + Green', 'Yellow + Purple', 'Orange + Pink'], correct: 'Blue + Gray' },
      { hex: '#D2691E', color1: 'Orange', color2: 'Brown', options: ['Orange + Brown', 'Blue + Red', 'Green + Yellow', 'Purple + Pink'], correct: 'Orange + Brown' },
      { hex: '#6A5ACD', color1: 'Blue', color2: 'Purple', options: ['Blue + Purple', 'Red + Green', 'Yellow + Orange', 'Pink + Brown'], correct: 'Blue + Purple' }
    ],
    difficult: [
      { hex: '#B22222', color1: 'Crimson', color2: 'Maroon', options: ['Crimson + Maroon', 'Teal + Salmon', 'Indigo + Lime', 'Coral + Navy'], correct: 'Crimson + Maroon' },
      { hex: '#483D8B', color1: 'Slate Blue', color2: 'Navy', options: ['Slate Blue + Navy', 'Turquoise + Magenta', 'Olive + Coral', 'Periwinkle + Crimson'], correct: 'Slate Blue + Navy' },
      { hex: '#2E8B57', color1: 'Sea Green', color2: 'Forest', options: ['Sea Green + Forest', 'Lavender + Salmon', 'Chartreuse + Indigo', 'Peach + Teal'], correct: 'Sea Green + Forest' },
      { hex: '#CD5C5C', color1: 'Indian Red', color2: 'Rose', options: ['Indian Red + Rose', 'Mint + Burgundy', 'Periwinkle + Coral', 'Sage + Crimson'], correct: 'Indian Red + Rose' },
      { hex: '#8FBC8F', color1: 'Dark Sea Green', color2: 'Sage', options: ['Dark Sea Green + Sage', 'Lavender + Coral', 'Turquoise + Burgundy', 'Peach + Navy'], correct: 'Dark Sea Green + Sage' },
      { hex: '#F4A460', color1: 'Sandy Brown', color2: 'Tan', options: ['Sandy Brown + Tan', 'Mint + Crimson', 'Periwinkle + Olive', 'Sage + Magenta'], correct: 'Sandy Brown + Tan' },
      { hex: '#DA70D6', color1: 'Orchid', color2: 'Plum', options: ['Orchid + Plum', 'Teal + Coral', 'Chartreuse + Navy', 'Peach + Indigo'], correct: 'Orchid + Plum' },
      { hex: '#5F9EA0', color1: 'Cadet Blue', color2: 'Slate', options: ['Cadet Blue + Slate', 'Lavender + Salmon', 'Mint + Burgundy', 'Sage + Crimson'], correct: 'Cadet Blue + Slate' },
      { hex: '#D2B48C', color1: 'Tan', color2: 'Wheat', options: ['Tan + Wheat', 'Periwinkle + Coral', 'Turquoise + Olive', 'Peach + Navy'], correct: 'Tan + Wheat' },
      { hex: '#BC8F8F', color1: 'Rosy Brown', color2: 'Dusty Rose', options: ['Rosy Brown + Dusty Rose', 'Mint + Indigo', 'Sage + Magenta', 'Chartreuse + Crimson'], correct: 'Rosy Brown + Dusty Rose' }
    ],
    impossible: [
      { hex: '#F5DEB3', color1: 'Wheat', color2: 'Vanilla', options: ['Wheat + Vanilla', 'Periwinkle + Sage', 'Chartreuse + Burgundy', 'Coral + Slate'], correct: 'Wheat + Vanilla' },
      { hex: '#DEB887', color1: 'Burlywood', color2: 'Khaki', options: ['Burlywood + Khaki', 'Lavender + Olive', 'Mint + Crimson', 'Turquoise + Rose'], correct: 'Burlywood + Khaki' },
      { hex: '#F0E68C', color1: 'Khaki', color2: 'Pale Goldenrod', options: ['Khaki + Pale Goldenrod', 'Periwinkle + Coral', 'Sage + Magenta', 'Chartreuse + Navy'], correct: 'Khaki + Pale Goldenrod' },
      { hex: '#E6E6FA', color1: 'Lavender', color2: 'Thistle', options: ['Lavender + Thistle', 'Mint + Burgundy', 'Peach + Indigo', 'Sage + Crimson'], correct: 'Lavender + Thistle' },
      { hex: '#FFEFD5', color1: 'Papaya Whip', color2: 'Antique White', options: ['Papaya Whip + Antique White', 'Periwinkle + Olive', 'Chartreuse + Rose', 'Coral + Slate'], correct: 'Papaya Whip + Antique White' },
      { hex: '#F5F5DC', color1: 'Beige', color2: 'Linen', options: ['Beige + Linen', 'Lavender + Crimson', 'Mint + Navy', 'Turquoise + Burgundy'], correct: 'Beige + Linen' },
      { hex: '#FDF5E6', color1: 'Old Lace', color2: 'Seashell', options: ['Old Lace + Seashell', 'Periwinkle + Magenta', 'Sage + Coral', 'Chartreuse + Indigo'], correct: 'Old Lace + Seashell' },
      { hex: '#F0FFF0', color1: 'Honeydew', color2: 'Mint Cream', options: ['Honeydew + Mint Cream', 'Lavender + Olive', 'Peach + Crimson', 'Turquoise + Rose'], correct: 'Honeydew + Mint Cream' },
      { hex: '#F8F8FF', color1: 'Ghost White', color2: 'Alice Blue', options: ['Ghost White + Alice Blue', 'Periwinkle + Burgundy', 'Sage + Navy', 'Chartreuse + Coral'], correct: 'Ghost White + Alice Blue' },
      { hex: '#FFFAFA', color1: 'Snow', color2: 'Floral White', options: ['Snow + Floral White', 'Mint + Indigo', 'Lavender + Crimson', 'Peach + Slate'], correct: 'Snow + Floral White' }
    ]
  };

  const hexQuestions = {
    easy: [
      { hex: '#FF0000', meaning: 'Pure Red', options: ['Pure Red', 'Pure Blue', 'Pure Green', 'Pure Yellow'], correct: 'Pure Red' },
      { hex: '#00FF00', meaning: 'Pure Green', options: ['Pure Red', 'Pure Blue', 'Pure Green', 'Pure Yellow'], correct: 'Pure Green' },
      { hex: '#0000FF', meaning: 'Pure Blue', options: ['Pure Red', 'Pure Blue', 'Pure Green', 'Pure Yellow'], correct: 'Pure Blue' },
      { hex: '#FFFF00', meaning: 'Pure Yellow', options: ['Pure Yellow', 'Pure Blue', 'Pure Green', 'Pure Red'], correct: 'Pure Yellow' },
      { hex: '#FF00FF', meaning: 'Pure Magenta', options: ['Pure Magenta', 'Pure Cyan', 'Pure Orange', 'Pure Purple'], correct: 'Pure Magenta' },
      { hex: '#00FFFF', meaning: 'Pure Cyan', options: ['Pure Cyan', 'Pure Magenta', 'Pure Orange', 'Pure Purple'], correct: 'Pure Cyan' },
      { hex: '#FFFFFF', meaning: 'White', options: ['White', 'Black', 'Gray', 'Silver'], correct: 'White' },
      { hex: '#000000', meaning: 'Black', options: ['Black', 'White', 'Gray', 'Silver'], correct: 'Black' },
      { hex: '#808080', meaning: 'Gray', options: ['Gray', 'Silver', 'Black', 'White'], correct: 'Gray' },
      { hex: '#FFA500', meaning: 'Orange', options: ['Orange', 'Purple', 'Brown', 'Pink'], correct: 'Orange' }
    ],
    medium: [
      { hex: '#8B0000', meaning: 'Dark Red', options: ['Dark Red', 'Light Red', 'Medium Red', 'Bright Red'], correct: 'Dark Red' },
      { hex: '#006400', meaning: 'Dark Green', options: ['Light Green', 'Dark Green', 'Medium Green', 'Bright Green'], correct: 'Dark Green' },
      { hex: '#00008B', meaning: 'Dark Blue', options: ['Light Blue', 'Medium Blue', 'Dark Blue', 'Bright Blue'], correct: 'Dark Blue' },
      { hex: '#FFB6C1', meaning: 'Light Pink', options: ['Light Pink', 'Dark Pink', 'Medium Pink', 'Hot Pink'], correct: 'Light Pink' },
      { hex: '#90EE90', meaning: 'Light Green', options: ['Dark Green', 'Light Green', 'Forest Green', 'Lime Green'], correct: 'Light Green' },
      { hex: '#ADD8E6', meaning: 'Light Blue', options: ['Light Blue', 'Dark Blue', 'Navy Blue', 'Sky Blue'], correct: 'Light Blue' },
      { hex: '#DDA0DD', meaning: 'Plum', options: ['Plum', 'Violet', 'Purple', 'Lavender'], correct: 'Plum' },
      { hex: '#F0E68C', meaning: 'Khaki', options: ['Khaki', 'Beige', 'Tan', 'Brown'], correct: 'Khaki' },
      { hex: '#40E0D0', meaning: 'Turquoise', options: ['Turquoise', 'Aqua', 'Teal', 'Cyan'], correct: 'Turquoise' },
      { hex: '#EE82EE', meaning: 'Violet', options: ['Purple', 'Violet', 'Magenta', 'Plum'], correct: 'Violet' }
    ],
    difficult: [
      { hex: '#8B4513', meaning: 'Saddle Brown', options: ['Saddle Brown', 'Chocolate', 'Peru', 'Sienna'], correct: 'Saddle Brown' },
      { hex: '#2F4F4F', meaning: 'Dark Slate Gray', options: ['Dark Slate Gray', 'Dim Gray', 'Slate Gray', 'Gray'], correct: 'Dark Slate Gray' },
      { hex: '#483D8B', meaning: 'Dark Slate Blue', options: ['Slate Blue', 'Dark Slate Blue', 'Medium Slate Blue', 'Blue Violet'], correct: 'Dark Slate Blue' },
      { hex: '#CD853F', meaning: 'Peru', options: ['Peru', 'Sandy Brown', 'Chocolate', 'Tan'], correct: 'Peru' },
      { hex: '#A0522D', meaning: 'Sienna', options: ['Sienna', 'Saddle Brown', 'Chocolate', 'Peru'], correct: 'Sienna' },
      { hex: '#556B2F', meaning: 'Dark Olive Green', options: ['Olive', 'Dark Olive Green', 'Olive Drab', 'Yellow Green'], correct: 'Dark Olive Green' },
      { hex: '#8FBC8F', meaning: 'Dark Sea Green', options: ['Sea Green', 'Dark Sea Green', 'Medium Sea Green', 'Light Sea Green'], correct: 'Dark Sea Green' },
      { hex: '#B22222', meaning: 'Fire Brick', options: ['Fire Brick', 'Indian Red', 'Crimson', 'Dark Red'], correct: 'Fire Brick' },
      { hex: '#5F9EA0', meaning: 'Cadet Blue', options: ['Steel Blue', 'Cadet Blue', 'Light Steel Blue', 'Powder Blue'], correct: 'Cadet Blue' },
      { hex: '#D2691E', meaning: 'Chocolate', options: ['Saddle Brown', 'Peru', 'Chocolate', 'Sienna'], correct: 'Chocolate' }
    ],
    impossible: [
      { hex: '#F5DEB3', meaning: 'Wheat', options: ['Wheat', 'Navajo White', 'Moccasin', 'Peach Puff'], correct: 'Wheat' },
      { hex: '#DEB887', meaning: 'Burlywood', options: ['Tan', 'Burlywood', 'Rosy Brown', 'Sandy Brown'], correct: 'Burlywood' },
      { hex: '#BC8F8F', meaning: 'Rosy Brown', options: ['Indian Red', 'Light Coral', 'Rosy Brown', 'Dark Salmon'], correct: 'Rosy Brown' },
      { hex: '#F4A460', meaning: 'Sandy Brown', options: ['Peru', 'Sandy Brown', 'Chocolate', 'Dark Salmon'], correct: 'Sandy Brown' },
      { hex: '#8B7355', meaning: 'Dark Khaki', options: ['Khaki', 'Dark Khaki', 'Olive Drab', 'Dark Olive Green'], correct: 'Dark Khaki' },
      { hex: '#FFEFD5', meaning: 'Papaya Whip', options: ['Blanched Almond', 'Papaya Whip', 'Peach Puff', 'Navajo White'], correct: 'Papaya Whip' },
      { hex: '#F5F5DC', meaning: 'Beige', options: ['Linen', 'Beige', 'Antique White', 'Old Lace'], correct: 'Beige' },
      { hex: '#FDF5E6', meaning: 'Old Lace', options: ['Seashell', 'Old Lace', 'Linen', 'Floral White'], correct: 'Old Lace' },
      { hex: '#FAF0E6', meaning: 'Linen', options: ['Old Lace', 'Antique White', 'Linen', 'Seashell'], correct: 'Linen' },
      { hex: '#FFF8DC', meaning: 'Cornsilk', options: ['Lemon Chiffon', 'Light Yellow', 'Cornsilk', 'Light Goldenrod Yellow'], correct: 'Cornsilk' }
    ]
  };

  const oppositeQuestions = {
    easy: [
      { color: 'Red', opposite: 'Green', options: ['Green', 'Blue', 'Yellow', 'Purple'], correct: 'Green' },
      { color: 'Blue', opposite: 'Orange', options: ['Red', 'Orange', 'Purple', 'Green'], correct: 'Orange' },
      { color: 'Yellow', opposite: 'Purple', options: ['Purple', 'Green', 'Red', 'Blue'], correct: 'Purple' },
      { color: 'Green', opposite: 'Red', options: ['Red', 'Blue', 'Orange', 'Purple'], correct: 'Red' },
      { color: 'Orange', opposite: 'Blue', options: ['Blue', 'Green', 'Purple', 'Yellow'], correct: 'Blue' },
      { color: 'Purple', opposite: 'Yellow', options: ['Yellow', 'Red', 'Green', 'Orange'], correct: 'Yellow' },
      { color: 'Pink', opposite: 'Green', options: ['Green', 'Blue', 'Yellow', 'Orange'], correct: 'Green' },
      { color: 'Cyan', opposite: 'Red', options: ['Red', 'Blue', 'Green', 'Purple'], correct: 'Red' },
      { color: 'Magenta', opposite: 'Green', options: ['Green', 'Blue', 'Yellow', 'Orange'], correct: 'Green' },
      { color: 'Lime', opposite: 'Magenta', options: ['Magenta', 'Blue', 'Red', 'Orange'], correct: 'Magenta' }
    ],
    medium: [
      { color: 'Teal', opposite: 'Coral', options: ['Coral', 'Pink', 'Orange', 'Red'], correct: 'Coral' },
      { color: 'Maroon', opposite: 'Mint', options: ['Mint', 'Blue', 'Purple', 'Teal'], correct: 'Mint' },
      { color: 'Navy', opposite: 'Peach', options: ['Peach', 'Yellow', 'Orange', 'Pink'], correct: 'Peach' },
      { color: 'Olive', opposite: 'Lavender', options: ['Lavender', 'Pink', 'Purple', 'Blue'], correct: 'Lavender' },
      { color: 'Salmon', opposite: 'Turquoise', options: ['Turquoise', 'Blue', 'Green', 'Teal'], correct: 'Turquoise' },
      { color: 'Indigo', opposite: 'Gold', options: ['Gold', 'Yellow', 'Orange', 'Peach'], correct: 'Gold' },
      { color: 'Crimson', opposite: 'Mint', options: ['Mint', 'Green', 'Teal', 'Turquoise'], correct: 'Mint' },
      { color: 'Chartreuse', opposite: 'Plum', options: ['Plum', 'Purple', 'Violet', 'Magenta'], correct: 'Plum' },
      { color: 'Periwinkle', opposite: 'Peach', options: ['Peach', 'Orange', 'Coral', 'Salmon'], correct: 'Peach' },
      { color: 'Burgundy', opposite: 'Sage', options: ['Sage', 'Green', 'Mint', 'Teal'], correct: 'Sage' }
    ],
    difficult: [
      { color: 'Vermillion', opposite: 'Celadon', options: ['Celadon', 'Viridian', 'Malachite', 'Jade'], correct: 'Celadon' },
      { color: 'Ultramarine', opposite: 'Amber', options: ['Amber', 'Ochre', 'Sienna', 'Umber'], correct: 'Amber' },
      { color: 'Cadmium', opposite: 'Prussian', options: ['Prussian', 'Cobalt', 'Cerulean', 'Azure'], correct: 'Prussian' },
      { color: 'Alizarin', opposite: 'Viridian', options: ['Viridian', 'Emerald', 'Malachite', 'Jade'], correct: 'Viridian' },
      { color: 'Burnt Sienna', opposite: 'Cerulean', options: ['Cerulean', 'Azure', 'Cobalt', 'Prussian'], correct: 'Cerulean' },
      { color: 'Raw Umber', opposite: 'Titanium', options: ['Titanium', 'Zinc', 'Lead', 'Flake'], correct: 'Titanium' },
      { color: 'Quinacridone', opposite: 'Phthalo', options: ['Phthalo', 'Viridian', 'Chromium', 'Emerald'], correct: 'Phthalo' },
      { color: 'Dioxazine', opposite: 'Aureolin', options: ['Aureolin', 'Cadmium', 'Chrome', 'Lemon'], correct: 'Aureolin' },
      { color: 'Manganese', opposite: 'Vermillion', options: ['Vermillion', 'Cinnabar', 'Realgar', 'Minium'], correct: 'Vermillion' },
      { color: 'Cobalt Violet', opposite: 'Sap Green', options: ['Sap Green', 'Hooker Green', 'Viridian', 'Chrome Green'], correct: 'Sap Green' }
    ],
    impossible: [
      { color: 'Quinacridone Rose', opposite: 'Phthalo Turquoise', options: ['Phthalo Turquoise', 'Cerulean Blue', 'Ultramarine', 'Prussian Blue'], correct: 'Phthalo Turquoise' },
      { color: 'Dioxazine Purple', opposite: 'Aureolin Yellow', options: ['Aureolin Yellow', 'Cadmium Yellow', 'Chrome Yellow', 'Indian Yellow'], correct: 'Aureolin Yellow' },
      { color: 'Perylene Maroon', opposite: 'Viridian Green', options: ['Viridian Green', 'Sap Green', 'Hooker Green', 'Chrome Green'], correct: 'Viridian Green' },
      { color: 'Anthraquinone Blue', opposite: 'Benzimidazolone Orange', options: ['Benzimidazolone Orange', 'Cadmium Orange', 'Chrome Orange', 'Perinone Orange'], correct: 'Benzimidazolone Orange' },
      { color: 'Isoindolinone Yellow', opposite: 'Carbazole Violet', options: ['Carbazole Violet', 'Quinacridone Violet', 'Dioxazine Purple', 'Manganese Violet'], correct: 'Carbazole Violet' },
      { color: 'Pyrrole Red', opposite: 'Phthalocyanine Green', options: ['Phthalocyanine Green', 'Viridian', 'Chrome Green', 'Emerald Green'], correct: 'Phthalocyanine Green' },
      { color: 'Naphthol Crimson', opposite: 'Chromium Oxide', options: ['Chromium Oxide', 'Viridian Green', 'Sap Green', 'Terre Verte'], correct: 'Chromium Oxide' },
      { color: 'Quinophthalone Gold', opposite: 'Indanthrone Blue', options: ['Indanthrone Blue', 'Prussian Blue', 'Anthraquinone Blue', 'Phthalocyanine Blue'], correct: 'Indanthrone Blue' },
      { color: 'Pyranthrone Orange', opposite: 'Chlorinated Copper', options: ['Chlorinated Copper', 'Phthalocyanine Green', 'Viridian', 'Chrome Green'], correct: 'Chlorinated Copper' },
      { color: 'Diketopyrrolopyrrole', opposite: 'Copper Phthalocyanine', options: ['Copper Phthalocyanine', 'Ultramarine Blue', 'Cobalt Blue', 'Cerulean Blue'], correct: 'Copper Phthalocyanine' }
    ]
  };

  useEffect(() => {
    if (!quizStarted) return;
    
    let questionSet;
    switch (quizType) {
      case 'mixing':
        questionSet = colorMixQuestions[difficulty];
        break;
      case 'hex':
        questionSet = hexQuestions[difficulty];
        break;
      case 'opposites':
        questionSet = oppositeQuestions[difficulty];
        break;
    }
    setQuestions(questionSet);
    setCurrentQuestion(0);
    setCorrectAnswers(0);
    setHintsUsed(0);
    setShowHint(false);
    setAnswerSelected(false);
  }, [quizType, difficulty, quizStarted]);

  const handleAnswer = (selectedAnswer: string) => {
    if (answerSelected) return; // Prevent multiple selections
    
    setAnswerSelected(true);
    const current = questions[currentQuestion];
    const isCorrect = selectedAnswer === current.correct;
    
    if (isCorrect) {
      const points = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : difficulty === 'difficult' ? 15 : 20;
      toast.success(`Brilliant! 🌟 +${points} points!`);
      onAddScore(points);
      setCorrectAnswers(prev => prev + 1);
    } else {
      const penalty = difficulty === 'easy' ? -30 : difficulty === 'medium' ? -20 : difficulty === 'difficult' ? -10 : -5;
      toast.error(`Oops! The answer was ${current.correct} 🎭 ${penalty} points`);
      onAddScore(penalty);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setShowHint(false);
        setAnswerSelected(false);
      } else {
        // Quiz finished
        const percentage = (correctAnswers + (isCorrect ? 1 : 0)) / questions.length * 100;
        let message = '';
        if (percentage >= 90) message = '🌟 Amazing! You\'re a color master! Keep creating beautiful art!';
        else if (percentage >= 70) message = '🎨 Great job! You really know your colors! Practice makes perfect!';
        else if (percentage >= 50) message = '😊 Good effort! You\'re learning so much! Keep exploring colors!';
        else message = '🌈 Every artist starts somewhere! Keep practicing and you\'ll get better!';
        
        toast.success(message);
        setQuizStarted(false);
      }
    }, 2000);
  };

  const useHint = () => {
    if (hintsUsed >= 3) {
      toast.error('No more hints available! 🤔');
      return;
    }
    setShowHint(true);
    setHintsUsed(prev => prev + 1);
    toast.info(`Hint used! ${3 - hintsUsed - 1} hints remaining 💡`);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  if (!quizStarted) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 bg-white/95 backdrop-blur border-4 border-purple-300 rounded-3xl shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-black text-purple-800 mb-3 transform -rotate-1"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Choose Your Challenge! 🎨
            </h2>
            
            {/* Difficulty Selection */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-purple-700 mb-3"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}>Difficulty Level</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(['easy', 'medium', 'difficult', 'impossible'] as Difficulty[]).map((level) => (
                  <Button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    variant={difficulty === level ? 'default' : 'outline'}
                    className={`p-3 text-lg font-bold rounded-2xl transition-all transform hover:scale-105 ${
                      difficulty === level 
                        ? level === 'easy' ? 'bg-green-500 hover:bg-green-600' :
                          level === 'medium' ? 'bg-yellow-500 hover:bg-yellow-600' :
                          level === 'difficult' ? 'bg-orange-500 hover:bg-orange-600' :
                          'bg-red-500 hover:bg-red-600'
                        : 'border-3'
                    }`}
                    style={{ fontFamily: 'Comic Sans MS, cursive' }}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)} 
                    {level === 'easy' ? ' 😊' : level === 'medium' ? ' 🤔' : level === 'difficult' ? ' 😤' : ' 🔥'}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quiz Type Selection */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-purple-700 mb-3"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}>Quiz Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button 
                  onClick={() => setQuizType('mixing')}
                  variant={quizType === 'mixing' ? 'default' : 'outline'}
                  className={`p-4 text-lg font-bold rounded-2xl ${quizType === 'mixing' ? 'bg-purple-600 hover:bg-purple-700' : 'border-3'}`}
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                >
                  🎨 Color Mixing
                </Button>
                <Button 
                  onClick={() => setQuizType('hex')}
                  variant={quizType === 'hex' ? 'default' : 'outline'}
                  className={`p-4 text-lg font-bold rounded-2xl ${quizType === 'hex' ? 'bg-blue-600 hover:bg-blue-700' : 'border-3'}`}
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                >
                  🔢 Hex Values
                </Button>
                <Button 
                  onClick={() => setQuizType('opposites')}
                  variant={quizType === 'opposites' ? 'default' : 'outline'}
                  className={`p-4 text-lg font-bold rounded-2xl ${quizType === 'opposites' ? 'bg-green-600 hover:bg-green-700' : 'border-3'}`}
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                >
                  🔄 Color Opposites
                </Button>
              </div>
            </div>

            <Button
              onClick={startQuiz}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-2xl font-black px-8 py-4 rounded-3xl shadow-lg transform hover:scale-105 transition-all"
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              Start Quiz! 🚀
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (questions.length === 0) return null;

  const question = questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-6 bg-white/95 backdrop-blur border-4 border-purple-300 rounded-3xl shadow-2xl">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-lg font-bold text-gray-700 text-center"
                 style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <Button
              onClick={useHint}
              disabled={hintsUsed >= 3 || showHint || answerSelected}
              variant="outline"
              className="border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50 font-bold rounded-2xl"
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              💡 Hint ({3 - hintsUsed} left)
            </Button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {quizType === 'mixing' && (
          <>
            <div 
              className="w-40 h-40 mx-auto mb-6 rounded-3xl shadow-2xl border-4 border-white"
              style={{ backgroundColor: question.hex }}
            />
            <h2 className="text-3xl font-black mb-4 text-center text-purple-800"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              What colors make this? 🎨
            </h2>
            <p className="text-xl text-gray-700 mb-6 text-center font-bold"
               style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Hex: {question.hex}
            </p>
          </>
        )}

        {quizType === 'hex' && (
          <>
            <div 
              className="w-40 h-40 mx-auto mb-6 rounded-3xl shadow-2xl border-4 border-white"
              style={{ backgroundColor: question.hex }}
            />
            <h2 className="text-3xl font-black mb-4 text-center text-purple-800"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              What color is this hex? 🔍
            </h2>
            <p className="text-xl text-gray-700 mb-6 text-center font-bold"
               style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              {question.hex}
            </p>
          </>
        )}

        {quizType === 'opposites' && (
          <>
            <div className="flex justify-center items-center gap-4 mb-6">
              <div 
                className="w-32 h-32 rounded-3xl shadow-2xl border-4 border-white"
                style={{ backgroundColor: colorHexMap[question.color] || '#808080' }}
              />
              <div className="text-6xl">↔️</div>
              <div className="w-32 h-32 rounded-3xl shadow-2xl border-4 border-gray-300 bg-gray-100 flex items-center justify-center">
                <span className="text-4xl">❓</span>
              </div>
            </div>
            <h2 className="text-3xl font-black mb-4 text-center text-purple-800"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              What's opposite to {question.color}? 🔄
            </h2>
            <p className="text-xl text-gray-700 mb-6 text-center font-bold"
               style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Find the complementary color!
            </p>
          </>
        )}

        {/* Hint Display */}
        {showHint && quizType === 'opposites' && (
          <Card className="p-4 mb-4 bg-yellow-50 border-3 border-yellow-300 rounded-2xl">
            <h3 className="text-lg font-bold text-yellow-800 mb-3 text-center"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              💡 Hint: Here are the color options!
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {question.options.map((option: string, index: number) => (
                <div key={index} className="text-center">
                  <div 
                    className="w-16 h-16 mx-auto rounded-2xl shadow-lg border-2 border-white"
                    style={{ backgroundColor: colorHexMap[option] || '#808080' }}
                  />
                  <p className="text-sm font-bold mt-2"
                     style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                    {option}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {question.options.map((option: string, index: number) => (
            <Button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={answerSelected}
              variant="outline"
              className={`p-4 text-lg font-bold border-3 border-purple-300 hover:bg-purple-100 hover:border-purple-500 transition-all duration-200 rounded-2xl transform hover:scale-105 ${
                answerSelected ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              {option}
            </Button>
          ))}
        </div>

        {quizType === 'hex' && (
          <Card className="p-4 bg-blue-50 border-3 border-blue-300 rounded-2xl">
            <h3 className="text-xl font-black text-blue-800 mb-3"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              🧠 Hex Code Learning Corner!
            </h3>
            <div className="text-sm font-semibold text-blue-700 space-y-2"
                 style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              <p>📚 Hex codes have 6 characters: #RRGGBB</p>
              <p>🔴 First 2 = Red (00-FF)</p>
              <p>🟢 Middle 2 = Green (00-FF)</p>
              <p>🔵 Last 2 = Blue (00-FF)</p>
              <p>🔢 0-9 = Numbers, A-F = Letters (A=10, B=11, C=12, D=13, E=14, F=15)</p>
              <p>✨ #FF0000 = Pure Red, #00FF00 = Pure Green, #0000FF = Pure Blue!</p>
            </div>
          </Card>
        )}
      </Card>
    </div>
  );
};
