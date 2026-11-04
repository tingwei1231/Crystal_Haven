import { mkdirSync, writeFileSync } from 'node:fs';

mkdirSync('public/images', { recursive: true });
const polygon = (points, fill, opacity = 1) => `<polygon points="${points}" fill="${fill}" opacity="${opacity}"/>`;
function crystal(x, y, height, width, angle, colors) {
  const h = height, w = width;
  return `<g transform="translate(${x} ${y}) rotate(${angle})">${polygon(`0,0 ${-w},${-h*.72} ${-w*.6},${-h*.91} 0,${-h} ${w*.65},${-h*.87} ${w},${-h*.24}`,colors[0])}${polygon(`0,0 0,${-h} ${w*.65},${-h*.87} ${w},${-h*.24}`,colors[1])}${polygon(`0,0 ${-w},${-h*.72} ${-w*.6},${-h*.91} ${-w*.2},${-h*.68} ${w*.2},${-h*.14}`,colors[2])}${polygon(`${-w*.6},${-h*.91} 0,${-h} ${w*.65},${-h*.87} ${-w*.2},${-h*.68}`,colors[3])}${polygon(`${-w*.2},${-h*.68} 0,${-h} ${w*.2},${-h*.14}`,colors[3],.2)}<path d="M${-w*.6},${-h*.91} L${-w*.2},${-h*.68} L${w*.2},${-h*.14}" stroke="${colors[3]}" opacity=".45" fill="none" stroke-width="1.5"/></g>`;
}
function cluster(palette) {
  let result='';
  const pieces=[[510,664,260,62,-42],[640,660,350,72,32],[570,687,420,81,-9],[720,695,245,56,56],[430,690,220,55,-61],[610,735,265,62,10],[790,724,155,43,64],[488,741,190,44,-35],[669,765,155,52,40]];
  for(const piece of pieces) result += crystal(...piece,palette);
  return result;
}
const palettes={quartz:['#9aaea5','#637b73','#c5d3c7','#eff1dd'],smoky:['#7f796a','#4a4e45','#b3a58e','#ded4b8'],green:['#566f5b','#2d4a3e','#91a58a','#d5ddbd']};
function seal(x=760,y=650,scale=1){return `<g transform="translate(${x} ${y}) scale(${scale})">${polygon('0,0 -110,-48 -110,-330 0,-290','#919581')}${polygon('0,0 110,-65 110,-345 0,-290','#535e51')}${polygon('-110,-330 0,-390 110,-345 0,-290','#d0ceb6')}<path d="M-83,-320 L-18,-285 M-102,-230 L-12,-192 M14,-170 L95,-214 M12,-70 L91,-115" stroke="#d4d4ba" stroke-width="2" opacity=".25"/><g transform="translate(150 -12) rotate(9)"><path d="M0,0 L100,0 L100,100 L0,100Z" fill="#b2b795"/><g fill="#303e33"><path d="M14 14h72v10H14z M23 24h10v24H23z M14 47h45v10H14z M65 24h10v63H65z M14 70h43v10H14z M25 56h10v31H25z M41 34h10v53H41z"/></g></g></g>`;}
const svg=(inner)=>`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900"><rect width="1200" height="900" fill="#181c1b"/><path d="M0 710L1200 620V900H0Z" fill="#202722"/>${inner}</svg>`;
for(const [name,palette] of Object.entries(palettes))writeFileSync(`public/images/${name}.svg`,svg(cluster(palette)));
writeFileSync('public/images/seal.svg',svg(`<g transform="translate(-170 0)">${seal(760,650,1.3)}</g>`));
writeFileSync('public/images/hero.svg',svg(`<g transform="translate(-100 -50) scale(.95)">${cluster(palettes.quartz)}</g>${seal(850,650,.8)}`));
writeFileSync('public/favicon.svg','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#181c1b"/><text x="32" y="44" text-anchor="middle" fill="#d9e3c5" font-family="serif" font-size="42">印</text></svg>');
console.log('Created original vector illustrations. Run rasterize.mjs for responsive WebP assets.');
