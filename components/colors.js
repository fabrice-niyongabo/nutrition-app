const autoColors = [
  'blue',
  'wheat',
  'coral',
  'green',
  '#333',
  'green',
  'lightpurple',
  'lightblue',
  'cyan',
  'brown',
];
module.exports = {
  green: '#00CC6C',
  darkGreen: '#007F5F',
  gray: '#E5E5E5',
  blue: 'rgb(1, 82, 119)',
  red: 'rgba(255,0,0,0.2)',
  gray: '#CCC',
  gray2: '#f2f2f2',
  gray3: 'rgb(233, 233, 233)',
  brown: 'brown',
  auto: () => {
    let x = Math.floor(Math.random() * autoColors.length);
    return autoColors[x];
  },
};
