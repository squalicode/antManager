import { useState, useRef } from "react";

import Info from "./components/Info";
import Deck from "./components/Deck";
import Hand from "./components/Hand";
import Footer from "./components/Footer";

import Results from "./components/Results";
import ThemeSelector from "./components/ThemeSelector";

function App() {
  const [turn, setTurn] = useState(1);
  const [theme, setTheme] = useState(getTheme());

  const eggPointValue = 5;
  const foodPointValue = 100;

  // Stats
  const stats = useRef({
    people: 0,
    ants: 0,
    eggs: 0,
    food: 10,
    fertility: 1,
    intelligence: 4,
    resistance: 1,
    attack: 1,
    luck: 1,

    peopleBonus: 0,
    fertilityBonus: 0,
    intelligenceBonus: 0,
    resistanceBonus: 0,
    attackBonus: 0,
    luckBonus: 0
  });

  // SVG icons
  const svgs = {
    ants: <svg className="svg-ants" aria-hidden="true" width="24px" height="24px" viewBox="0 0 24 24"><circle className="svg-color-stroke svg-color-ants" cx="18" cy="15" r="4.5" /><circle fill="none"className="svg-color-stroke " cx="11.5" cy="14" r="2" /><circle className="svg-color-stroke svg-color-ants" cx="7" cy="10" r="4" /><path fill="none" className="svg-color-stroke" d="M 5 2 a 5 5 0 0 0 3 4" /><path fill="none" className="svg-color-stroke" d="M 9 14 a 7 10 0 0 0 -6 6.5"/><path fill="none" className="svg-color-stroke" d="M 11 16 a 7 8 0 0 0 -3 4.5" /><line className="svg-color-stroke" x1="13" y1="16" x2="13" y2="20.5" /><line className="svg-color-stroke" x1="6" y1="10" x2="6" y2="10" /></svg>,
    eggs: <svg className="svg-eggs" aria-hidden="true" width="24px" height="24px" viewBox="-0.96 -0.96 25.92 25.92"><path className="svg-color-stroke svg-color-eggs" d="M12,2A6.194,6.194,0,0,0,8,4a12.675,12.675,0,0,0-4,9c0,3,2,9,8,9s8-6,8-9a12.675,12.675,0,0,0-4-9A6.194,6.194,0,0,0,12,2Zm0,17a4.655,4.655,0,0,1-4.188-2.511,1,1,0,1,1 1.745"></path></svg>,
    food: <svg className="svg-food" aria-hidden="true" width="24px" height="24px" viewBox="-0.48 -0.48 24.96 24.96"><path className="svg-color-stroke svg-color-food" d="M9.17,3.55h1.89a3.78,3.78,0,0,1,3.78,3.78V9.22a0,0,0,0,1,0,0H12.94A3.78,3.78,0,0,1,9.17,5.44V3.55A0,0,0,0,1,9.17,3.55Z" transform="translate(8.03 -6.62) rotate(45)"></path><path className="svg-color-stroke svg-color-food" d="M12,8.27h1.89A3.78,3.78,0,0,1,17.66,12v1.89a0,0,0,0,1,0,0H15.78A3.78,3.78,0,0,1,12,10.16V8.27A0,0,0,0,1,12,8.27Z" transform="translate(25.94 -3.73) rotate(90)"></path><path className="svg-color-stroke svg-color-food" d="M6.34,8.27H8.22A3.78,3.78,0,0,1,12,12v1.89a0,0,0,0,1,0,0H10.11a3.78,3.78,0,0,1-3.78-3.78V8.27A0,0,0,0,1,6.34,8.27Z"></path><path className="svg-color-stroke svg-color-food" d="M12,13.94h1.89a3.78,3.78,0,0,1,3.78,3.78V19.6a0,0,0,0,1,0,0H15.78A3.78,3.78,0,0,1,12,15.83V13.94A0,0,0,0,1,12,13.94Z" transform="translate(31.6 1.94) rotate(90)"></path><path className="svg-color-stroke svg-color-food" d="M6.34,13.94H8.22A3.78,3.78,0,0,1,12,17.71V19.6a0,0,0,0,1,0,0H10.11a3.78,3.78,0,0,1-3.78-3.78V13.94A0,0,0,0,1,6.34,13.94Z"></path><line className="svg-color-stroke svg-color-food" x1="12" y1="22.5" x2="12" y2="10.16"></line></svg>,
    fertility: <svg className="svg-fertility" aria-hidden="true" width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path className="svg-color-stroke svg-color-fertility" d="M21 12.1818L16.9354 13.6599C16.3462 13.8741 15.8916 14.3521 15.7073 14.9513L14.1538 20C14.1072 20.1515 13.8928 20.1515 13.8461 20L12.2927 14.9513C12.1083 14.3521 11.6537 13.8741 11.0646 13.6599L6.99999 12.1818C6.83019 12.1201 6.83019 11.8799 6.99999 11.8182L11.0646 10.3401C11.6537 10.1259 12.1083 9.64786 12.2927 9.04872L13.8461 4C13.8928 3.8485 14.1072 3.8485 14.1538 4L15.7073 9.04872C15.8916 9.64786 16.3462 10.1259 16.9354 10.3401L21 11.8182C21.1698 11.8799 21.1698 12.1201 21 12.1818Z"/><path className="svg-color-stroke" d="M3.75 5.25C4.22214 5.40738 4.59262 5.77786 4.75 6.25C4.83008 6.49025 5.16992 6.49025 5.25 6.25C5.40738 5.77786 5.77786 5.40738 6.25 5.25C6.49025 5.16992 6.49025 4.83008 6.25 4.75C5.77786 4.59262 5.40738 4.22214 5.25 3.75C5.16992 3.50975 4.83008 3.50975 4.75 3.75C4.59262 4.22214 4.22214 4.59262 3.75 4.75C3.50975 4.83008 3.50975 5.16992 3.75 5.25Z"/><path className="svg-color-stroke" d="M7.25 19.25C6.77786 19.4074 6.40738 19.7779 6.25 20.25C6.16992 20.4903 5.83008 20.4903 5.75 20.25C5.59262 19.7779 5.22214 19.4074 4.75 19.25C4.50975 19.1699 4.50975 18.8301 4.75 18.75C5.22214 18.5926 5.59262 18.2221 5.75 17.75C5.83008 17.5097 6.16992 17.5097 6.25 17.75C6.40738 18.2221 6.77786 18.5926 7.25 18.75C7.49025 18.8301 7.49025 19.1699 7.25 19.25Z"/></svg>,
    intelligence: <svg className="svg-intelligence" aria-hidden="true" width="24px" height="24px" viewBox="-5.12 -5.12 266.24 266.24"><path className="svg-color-stroke svg-color-intelligence" d="M240,132a48.01975,48.01975,0,0,1-31.99951,45.26855L208,177.26685V184a40,40,0,0,1-80,0,40,40,0,0,1-80,0v-6.73315l-.00049.0017a48.01968,48.01968,0,0,1-.00049-90.537L48,72a40,40,0,0,1,80,0,40,40,0,0,1,80,0l.001,14.73157A48.02,48.02,0,0,1,240,132Z"></path><path className="svg-color-stroke svg-color-stroke-fill" d="M248,132a56.1211,56.1211,0,0,0-31.99951-50.61035L216,72a47.98283,47.98283,0,0,0-88-26.49316A47.98283,47.98283,0,0,0,40,71.99951l-.00049,9.39014A56.00268,56.00268,0,0,0,40,182.58569V184a47.98283,47.98283,0,0,0,88,26.49316A47.98283,47.98283,0,0,0,216,184v-1.41431A56.06726,56.06726,0,0,0,248,132ZM88,216a32.0433,32.0433,0,0,1-31.812-28.55664A56.1738,56.1738,0,0,0,64,188h8a8,8,0,0,0,0-16H64A40.00827,40.00827,0,0,1,50.66553,94.27393a7.99958,7.99958,0,0,0,5.33349-7.542L56,72a32,32,0,0,1,64,0v76.26147A47.80252,47.80252,0,0,0,88,136a8,8,0,0,0,0,16,32,32,0,0,1,0,64Zm104-44h-8a8,8,0,0,0,0,16h8a56.1738,56.1738,0,0,0,7.812-.55664A31.999,31.999,0,1,1,168,152a8,8,0,0,0,0-16,47.80252,47.80252,0,0,0-32,12.26147V72a32,32,0,1,1,64,.00049l.001,14.73144a7.99958,7.99958,0,0,0,5.33349,7.542A40.00827,40.00827,0,0,1,192,172ZM60,128a8,8,0,0,1,0-16A20.0226,20.0226,0,0,0,80,92V84a8,8,0,0,1,16,0v8A36.04061,36.04061,0,0,1,60,128Zm144-8a8.00008,8.00008,0,0,1-8,8,36.04061,36.04061,0,0,1-36-36V84a8,8,0,0,1,16,0v8a20.0226,20.0226,0,0,0,20,20A8.00008,8.00008,0,0,1,204,120Z"></path></svg>,
    resistance: <svg className="svg-resistance" aria-hidden="true" width="24px" height="24px" viewBox="0 0 24 24" fill="none" ><path className="svg-color-stroke svg-color-resistance" d="M4.8057 5.70615C5.39093 4.87011 5.68354 4.45209 6.11769 4.22604C6.55184 4 7.0621 4 8.08262 4H12H15.9174C16.9379 4 17.4482 4 17.8823 4.22604C18.3165 4.45209 18.6091 4.87011 19.1943 5.70615L19.7915 6.55926C20.6145 7.73493 21.0259 8.32277 21.0064 8.98546C20.9869 9.64815 20.5415 10.2107 19.6507 11.3359L14.375 18C13.6417 18.9263 13.275 19.3895 12.8472 19.5895C12.3103 19.8406 11.6897 19.8406 11.1528 19.5895C10.725 19.3895 10.3583 18.9263 9.625 18L4.34927 11.3359C3.4585 10.2107 3.01312 9.64815 2.99359 8.98546C2.97407 8.32277 3.38555 7.73493 4.20852 6.55926L4.8057 5.70615Z"></path><path d="M4.8057 5.70615C5.39093 4.87011 5.68354 4.45209 6.11769 4.22604C6.55184 4 7.0621 4 8.08262 4H12H15.9174C16.9379 4 17.4482 4 17.8823 4.22604C18.3165 4.45209 18.6091 4.87011 19.1943 5.70615L19.7915 6.55926C20.6144 7.73493 21.0259 8.32277 21.0064 8.98546C20.9869 9.64815 20.5415 10.2107 19.6507 11.3359L14.375 18V18C13.6417 18.9263 13.275 19.3895 12.8472 19.5895C12.3103 19.8406 11.6897 19.8406 11.1528 19.5895C10.725 19.3895 10.3583 18.9263 9.625 18V18L4.34927 11.3359C3.4585 10.2107 3.01312 9.64815 2.99359 8.98546C2.97407 8.32277 3.38555 7.73493 4.20852 6.55926L4.8057 5.70615Z"></path><path className="svg-color-stroke" d="M9.5 4.5 L8.5 9.25 L11.3 19"></path><path className="svg-color-stroke" d="M14.5 4.5 L15.5 9.25 L12.7 19"></path><line className="svg-color-stroke" x1="4" y1="9" x2="20" y2="9" /></svg>,
    attack: <svg className="svg-attack" aria-hidden="true" width="24px" height="24px" viewBox="0 0 256 256"><path className="svg-color-stroke svg-color-attack" d="M82.14214,197.45584,52.201,227.397a8,8,0,0,1-11.31371,0L28.603,215.11268a8,8,0,0,1,0-11.31371l29.94113-29.94112a8,8,0,0,0,0-11.31371L37.65685,141.65685a8,8,0,0,1,0-11.3137l12.6863-12.6863a8,8,0,0,1,11.3137,0l76.6863,76.6863a8,8,0,0,1,0,11.3137l-12.6863,12.6863a8,8,0,0,1-11.3137,0L93.45584,197.45584A8,8,0,0,0,82.14214,197.45584Z"></path><path className="svg-color-stroke-fill" d="M221.65723,34.34326A8.00246,8.00246,0,0,0,216,32h-.02539l-63.79883.20117A8.00073,8.00073,0,0,0,146.0332,35.106L75.637,120.32275,67.31348,111.999A16.02162,16.02162,0,0,0,44.68555,112L32.001,124.68555A15.99888,15.99888,0,0,0,32,147.31348l20.88672,20.88769L22.94531,198.14258a16.01777,16.01777,0,0,0,.001,22.62695l12.28418,12.28418a16.00007,16.00007,0,0,0,22.62793,0L87.79883,203.1123,108.68652,224.001A16.02251,16.02251,0,0,0,131.31445,224L143.999,211.31445A15.99888,15.99888,0,0,0,144,188.68652l-8.32324-8.32324,85.21679-70.39648a8.00125,8.00125,0,0,0,2.90528-6.14258L224,40.02539A8.001,8.001,0,0,0,221.65723,34.34326ZM120,212.68652,99.11328,191.79883a16,16,0,0,0-22.62793,0L46.544,221.74023,34.25977,209.45605l29.9414-29.9414a16.01866,16.01866,0,0,0,0-22.62695L43.31445,136,56,123.31348l14.50171,14.50195.00122.001,23.8374,23.83789.00244.00293.00244.00195L132.68555,200Zm87.81055-112.665-83.49829,68.97706L111.314,156l54.34327-54.34277a8.00053,8.00053,0,0,0-11.31446-11.31446L100,144.686,87.00195,131.6875,155.97852,48.189l51.99609-.16357Z"></path></svg>,
    luck: <svg className="svg-luck" aria-hidden="true" width="24px" height="24px" viewBox="0 0 24 24"><rect className="svg-color-luck" width="10" height="10" x="8" y="8" /><path className="svg-color-stroke svg-color-luck" d="M16.2 3.8a2.7 2.7 0 00-3.81 0l-.4.38-.4-.4a2.7 2.7 0 00-3.82 0C6.73 4.85 6.67 6.64 8 8l4 4 4-4c1.33-1.36 1.27-3.15.2-4.2z"></path><path className="svg-color-stroke svg-color-luck" d="M8 8c-1.36-1.33-3.15-1.27-4.2-.2a2.7 2.7 0 000 3.81l.38.4-.4.4a2.7 2.7 0 000 3.82C4.85 17.27 6.64 17.33 8 16"></path><path className="svg-color-stroke svg-color-luck" d="M16 16c1.36 1.33 3.15 1.27 4.2.2a2.7 2.7 0 000-3.81l-.38-.4.4-.4a2.7 2.7 0 000-3.82C19.15 6.73 17.36 6.67 16 8"></path><path className="svg-color-stroke svg-color-luck" d="M7.8 20.2a2.7 2.7 0 003.81 0l.4-.38.4.4a2.7 2.7 0 003.82 0c1.06-1.06 1.12-2.85-.21-4.21l-4-4-4 4c-1.33 1.36-1.27 3.15-.2 4.2z"></path><path className="svg-color-stroke" d="M7 17l-5 5"></path></svg>,
    eclosion: <svg className="svg-event" aria-hidden="true" width="24px" height="24px" viewBox="0 0 256 256"><path className="svg-color-stroke svg-color-event" d="M128,8s46.22217,40,0,56C80,48,128,8,128,8Zm78,80H50a23.99994,23.99994,0,0,0-24,24v13.32861c0,19.06446,15.602,35.02979,34.66309,34.665A34,34,0,0,0,94,126a34,34,0,0,0,68,0,34,34,0,0,0,33.33691,33.99365C214.398,160.3584,230,144.39307,230,125.32861V112A23.99994,23.99994,0,0,0,206,88Z"></path><path className="svg-color-stroke-fill" d="M206,80H136V69.439c11.49683-5.13232,18.2417-12.52441,20.07031-22.03027,4.11914-21.41113-20.06445-43.06006-22.835-45.458a7.99935,7.99935,0,0,0-10.35644-.09619c-2.85938,2.38184-27.81446,23.895-23.76661,45.34717,1.82349,9.6665,8.84131,17.15674,20.8877,22.31885V80H50a32.03635,32.03635,0,0,0-32,32v13.32812A43.21843,43.21843,0,0,0,30.90918,155.9834c.35693.35058.72461.68408,1.09082,1.02V208a16.01833,16.01833,0,0,0,16,16H208a16.01833,16.01833,0,0,0,16-16V157.00439c.36646-.33593.73389-.67041,1.09082-1.021A43.21843,43.21843,0,0,0,238,125.32812V112A32.03635,32.03635,0,0,0,206,80ZM114.83691,44.24658c-1.49707-7.87451,6.665-18.48974,13.05176-25.13818,6.17676,6.707,14.00293,17.36572,12.46778,25.29053-.85157,4.39209-5.02149,8.11474-12.40723,11.08447C122.05859,53.20068,115.84961,49.57471,114.83691,44.24658ZM34,112A16.01833,16.01833,0,0,1,50,96H206a16.01833,16.01833,0,0,1,16,16v13.32812a27.12336,27.12336,0,0,1-8.11426,19.23438,25.50436,25.50436,0,0,1-18.39551,7.43262A26.12635,26.12635,0,0,1,170,126a7.96676,7.96676,0,0,0-1.8269-5.08887c-.16309-.19726-.33545-.3872-.51636-.56787a7.99342,7.99342,0,0,0-11.31348,0c-.18091.18067-.35327.37061-.51636.56787A7.96676,7.96676,0,0,0,154,126a26,26,0,0,1-52,0,7.96676,7.96676,0,0,0-1.8269-5.08887c-.16309-.19726-.33545-.3872-.51636-.56787a7.99342,7.99342,0,0,0-11.31348,0c-.18091.18067-.35327.37061-.51636.56787A7.96676,7.96676,0,0,0,86,126a26.12635,26.12635,0,0,1-25.49023,25.99512,25.49361,25.49361,0,0,1-18.39551-7.43262A27.12336,27.12336,0,0,1,34,125.32812Zm174,96H48V166.20264a41.09921,41.09921,0,0,0,12.81641,1.78955,42.04634,42.04634,0,0,0,33.15014-17.42432,41.9385,41.9385,0,0,0,68.0669,0,42.04634,42.04634,0,0,0,33.15014,17.42432q.40137.00732.80079.00781A41.06205,41.06205,0,0,0,208,166.209Z"></path></svg>,
    raid: <svg className="svg-event" aria-hidden="true" width="24px" height="24px" viewBox="0 0 24 24"><path className="svg-color-stroke svg-color-event" d="M12,2a8.945,8.945,0,0,0-9,8.889,8.826,8.826,0,0,0,3.375,6.933v1.956A2.236,2.236,0,0,0,8.625,22h6.75a2.236,2.236,0,0,0,2.25-2.222V17.822A8.826,8.826,0,0,0,21,10.889,8.945,8.945,0,0,0,12,2ZM8,15a2,2,0,1,1,2-2A2,2,0,0,1,8,15Zm8,5m0-5a2,2,0,1,1,2-2A2,2,0,0,1,16,15Z"></path><line className="svg-color-stroke" x1="10" y1="19" x2="10" y2="22" /><line className="svg-color-stroke" x1="14" y1="19" x2="14" y2="22" /></svg>,
    people: <svg className="svg-secret" aria-hidden="true" width="24px" height="24px" viewBox="0 0 24 24"><path className="svg-color-stroke svg-color-secret" d="M9 10H9.01M15 10H15.01M8.53516 14C9.22678 15.1956 10.5195 16 12 16C13.4806 16 14.7733 15.1956 15.4649 14M12 20C15.7277 20 18.8599 17.4505 19.748 14H20C21.1046 14 22 13.1046 22 12C22 10.8954 21.1046 10 20 10H19.748C18.8599 6.54955 15.7277 4 12 4C8.27232 4 5.14012 6.54955 4.25204 10H4C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14H4.25204C5.14012 17.4505 8.27232 20 12 20Z"></path></svg>,
    earth: <svg className="svg-secret" aria-hidden="true" width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path className="svg-color-secret" d="M20.5719 14.75C20.8498 13.8832 20.9998 12.9591 20.9998 12C20.9998 10.2423 20.496 8.60233 19.6248 7.21658C19.588 7.23784 19.5454 7.25001 19.4998 7.25001H17.8539C16.968 7.25001 16.2498 7.96819 16.2498 8.85411C16.2498 9.65109 15.7995 10.3797 15.0867 10.7361L15.0061 10.7764C14.3726 11.0931 13.627 11.0931 12.9936 10.7764L12.9129 10.7361C12.2001 10.3797 11.7498 9.65109 11.7498 8.85411C11.7498 7.96819 11.0316 7.25001 10.1457 7.25001H9.99983C8.75719 7.25001 7.74983 6.24265 7.74983 5.00001V4.0647C5.27174 5.3947 3.48867 7.85158 3.08594 10.75H5.99983C7.24247 10.75 8.24983 11.7574 8.24983 13C8.24983 13.9665 9.03333 14.75 9.99983 14.75C11.2425 14.75 12.2498 15.7574 12.2498 17V20.9966C13.4963 20.9626 14.6796 20.6752 15.7498 20.1839V17C15.7498 15.7574 16.7572 14.75 17.9998 14.75H20.5719Z" /><path className="svg-color-stroke" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" /><path className="svg-color-stroke" d="M3.5 11H6C7.10457 11 8 11.8954 8 13V13C8 14.1046 8.89543 15 10 15V15C11.1046 15 12 15.8954 12 17V20.5"  /><path className="svg-color-stroke" d="M8 4V5C8 6.10457 8.89543 7 10 7H10.1459C11.1699 7 12 7.83011 12 8.8541V8.8541C12 9.55638 12.3968 10.1984 13.0249 10.5125L13.1056 10.5528C13.6686 10.8343 14.3314 10.8343 14.8944 10.5528L14.9751 10.5125C15.6032 10.1984 16 9.55638 16 8.8541V8.8541C16 7.83011 16.8301 7 17.8541 7H19.5" /><path className="svg-color-stroke" d="M16 19.5V17C16 15.8954 16.8954 15 18 15H20" /></svg>,
    spring: <svg className="svg-intelligence" aria-hidden="true" width="24px" height="24px" viewBox="0 0 256 256"><path className="svg-color-stroke svg-color-intelligence" d="M115.02734,103.18018C107.70215,87.77637,100,68.5874,100,56a28,28,0,0,1,56,0c0,12.5874-7.70215,31.77637-15.02734,47.18018a28.04927,28.04927,0,0,0-25.94532,0Zm25.9458,0h-.00048l-.001.00244Zm-40.95166,23.645-.00244-.00049v.00049ZM112.9917,104.355v.00049l.00146.002ZM51.646,116.24854c10.90136,6.29394,31.3706,9.21826,48.373,10.57617a28.05055,28.05055,0,0,1,12.97266-22.46924c-9.67725-14.0459-22.44434-30.31055-33.3457-36.604a27.99985,27.99985,0,1,0-28,48.49708ZM103.75146,142a27.87992,27.87992,0,0,1-3.73242-12.8252c-17.00244,1.3584-37.47168,4.28272-48.373,10.57666a27.99985,27.99985,0,0,0,28,48.49708c10.90136-6.29346,23.66845-22.55811,33.3457-36.604A27.872,27.872,0,0,1,103.75146,142Zm11.2754,10.81982h.00048l.001-.00244Zm25.94482-.00244.001.00244h.00048ZM128,156a27.87641,27.87641,0,0,1-12.97266-3.18018C107.70215,168.22363,100,187.4126,100,200a28,28,0,0,0,56,0c0-12.5874-7.70215-31.77637-15.02734-47.18018A27.87641,27.87641,0,0,1,128,156Zm76.354-16.24854c-10.90136-6.29394-31.3706-9.21826-48.373-10.57666a28.05046,28.05046,0,0,1-12.97266,22.46973c9.67725,14.0459,22.44434,30.31055,33.3457,36.604a27.99985,27.99985,0,1,0,28-48.49708ZM155.981,126.8252v-.00049l-.00244.00049Zm-12.97412-22.46778.00146-.002V104.355ZM152.24854,114a27.87382,27.87382,0,0,1,3.73242,12.82471c17.00244-1.35791,37.47168-4.28223,48.373-10.57617a27.99985,27.99985,0,1,0-28-48.49708c-10.90136,6.29346-23.66845,22.55811-33.3457,36.604A27.87638,27.87638,0,0,1,152.24854,114Z"></path><path className="svg-color-stroke-fill" d="M208.35352,132.82324A57.99826,57.99826,0,0,0,196.93994,128a58.016,58.016,0,0,0,11.41406-4.82324,36,36,0,1,0-36.00048-62.35352,58.00132,58.00132,0,0,0-9.88331,7.47266A58.01937,58.01937,0,0,0,164,56a36,36,0,0,0-72,0,58.01145,58.01145,0,0,0,1.52979,12.29541A58.01465,58.01465,0,0,0,83.646,60.82227a36.00017,36.00017,0,0,0-35.99952,62.35449A57.99826,57.99826,0,0,0,59.06006,128,58.016,58.016,0,0,0,47.646,132.82324a36,36,0,0,0,36.00048,62.35352,58.00132,58.00132,0,0,0,9.88331-7.47266A58.01937,58.01937,0,0,0,92,200a36,36,0,0,0,72,0,58.01145,58.01145,0,0,0-1.52979-12.29541,58.01465,58.01465,0,0,0,9.88379,7.47314,36.00017,36.00017,0,0,0,35.99952-62.35449ZM108,128a20,20,0,1,1,20,20A20.02229,20.02229,0,0,1,108,128Zm72.35352-53.32031a20.00025,20.00025,0,1,1,20,34.6416c-6.78809,3.91894-20.043,7.01318-37.72608,8.85791a36.0029,36.0029,0,0,0-8.81982-15.2417C164.251,88.5376,173.5625,78.59961,180.35352,74.67969ZM128,36a20.02229,20.02229,0,0,1,20,20c0,7.83789-3.94629,20.86182-11.18848,37.09473a36.00948,36.00948,0,0,0-17.623,0C111.94629,76.86182,108,63.83789,108,56A20.02229,20.02229,0,0,1,128,36ZM48.32568,82a20.02139,20.02139,0,0,1,27.3208-7.32129c6.791,3.9209,16.10254,13.85889,26.5459,28.25879a36.0029,36.0029,0,0,0-8.81982,15.2417c-17.68311-1.84473-30.938-4.939-37.72608-8.85791A20.02344,20.02344,0,0,1,48.32568,82Zm27.3208,99.32031a20.00025,20.00025,0,1,1-20-34.6416c6.78809-3.91894,20.043-7.01318,37.72608-8.85791a36.0029,36.0029,0,0,0,8.81982,15.2417C91.749,167.4624,82.4375,177.40039,75.64648,181.32031ZM128,220a20.02229,20.02229,0,0,1-20-20c0-7.83789,3.94629-20.86182,11.18848-37.09473a36.00948,36.00948,0,0,0,17.623,0C144.05371,179.13818,148,192.16211,148,200A20.02229,20.02229,0,0,1,128,220Zm79.67432-46a20.0259,20.0259,0,0,1-27.3208,7.32129c-6.791-3.9209-16.10254-13.85889-26.5459-28.25879a36.0029,36.0029,0,0,0,8.81982-15.2417c17.68311,1.84473,30.938,4.939,37.72608,8.85791A20.02344,20.02344,0,0,1,207.67432,174Z"></path></svg>,
    summer: <svg className="svg-food" aria-hidden="true" width="24px" height="24px" viewBox="0 0 24 24"><path className="svg-color-stroke-fill" d="M12,22a1,1,0,0,1-1-1V17a1,1,0,0,1,2,0v4A1,1,0,0,1,12,22Zm6.36-2.64a1,1,0,0,1-.7-.29l-2.83-2.83a1,1,0,0,1,1.41-1.41l2.83,2.83a1,1,0,0,1,0,1.41A1,1,0,0,1,18.36,19.36Zm-12.72,0a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.41l2.83-2.83a1,1,0,0,1,1.41,1.41L6.34,19.07A1,1,0,0,1,5.64,19.36ZM21,13H17a1,1,0,0,1,0-2h4a1,1,0,0,1,0,2ZM7,13H3a1,1,0,0,1,0-2H7a1,1,0,0,1,0,2Zm8.54-3.54a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.41l2.83-2.83a1,1,0,1,1,1.41,1.41L16.24,9.17A1,1,0,0,1,15.54,9.46Zm-7.08,0a1,1,0,0,1-.7-.29L4.93,6.34A1,1,0,0,1,6.34,4.93L9.17,7.76a1,1,0,0,1,0,1.41A1,1,0,0,1,8.46,9.46ZM12,8a1,1,0,0,1-1-1V3a1,1,0,0,1,2,0V7A1,1,0,0,1,12,8Z"></path><circle className="svg-color-stroke svg-color-food" cx="12" cy="12" r="5"></circle></svg>,
    autumn: <svg className="svg-attack" aria-hidden="true" width="24px" height="24px" viewBox="-1.92 -1.92 27.84 27.84"><path className="svg-color-stroke svg-color-attack" d="M22.52,7.24V9.53a5.34,5.34,0,0,1-3,4.82,4.21,4.21,0,0,1,1.11,2.83v1.54H16.2A4.19,4.19,0,0,1,12,14.89H12A4.19,4.19,0,0,1,7.8,18.72H3.39V17.18A4.21,4.21,0,0,1,4.5,14.35a5.34,5.34,0,0,1-3-4.82V7.24H6.63a4.94,4.94,0,0,1,1,.09A9.81,9.81,0,0,1,12,1.5a9.81,9.81,0,0,1,4.42,5.83,4.94,4.94,0,0,1,.95-.09Z"></path><line className="svg-color-stroke" x1="12" y1="7.24" x2="12" y2="23.5"></line><line className="svg-color-stroke" x1="6.26" y1="11.07" x2="12" y2="14.89"></line><line className="svg-color-stroke" x1="17.78" y1="11.07" x2="12" y2="14.89"></line></svg>,
    winter: <svg className="svg-resistance" aria-hidden="true" width="24px" height="24px" viewBox="-2.24 -2.24 36.48 36.48"><path className="svg-color-stroke-fill" d="M28.285 16.575l-4.475 2.49-5.309-3.065 5.305-3.063 4.487 2.488c0.173 0.099 0.38 0.157 0.601 0.157 0.001 0 0.002 0 0.003 0h-0c0.001 0 0.002 0 0.003 0 0.69 0 1.249-0.559 1.249-1.249 0-0.468-0.258-0.876-0.639-1.090l-0.006-0.003-3.174-1.759 2.42-1.397c0.377-0.22 0.625-0.623 0.625-1.083 0-0.691-0.56-1.25-1.25-1.25-0.23 0-0.446 0.062-0.631 0.171l0.006-0.003-2.418 1.396 0.058-3.625c0-0.006 0-0.013 0-0.020 0-0.684-0.549-1.239-1.23-1.25h-0.001c-0.684 0.007-1.24 0.549-1.269 1.227l-0 0.003-0.082 5.124-5.308 3.065v-6.127l4.4-2.636c0.366-0.222 0.607-0.619 0.607-1.072 0-0.69-0.56-1.25-1.25-1.25-0.237 0-0.459 0.066-0.648 0.181l0.006-0.003-3.115 1.866v-2.794c0-0.69-0.56-1.25-1.25-1.25s-1.25 0.56-1.25 1.25v0 2.792l-3.106-1.866c-0.183-0.111-0.404-0.176-0.64-0.176-0.69 0-1.25 0.56-1.25 1.25 0 0.451 0.239 0.846 0.597 1.066l0.005 0.003 4.394 2.639v6.128l-5.306-3.064-0.083-5.126c-0.028-0.682-0.585-1.224-1.27-1.229h-0.001c-0.682 0.012-1.23 0.567-1.23 1.25 0 0.007 0 0.014 0 0.021v-0.001l0.059 3.628-2.418-1.396c-0.179-0.105-0.395-0.167-0.625-0.167-0.691 0-1.25 0.56-1.25 1.25 0 0.46 0.249 0.863 0.619 1.080l0.006 0.003 2.418 1.396-3.172 1.758c-0.388 0.217-0.646 0.626-0.646 1.095 0 0.69 0.56 1.25 1.25 1.25 0.224 0 0.434-0.059 0.616-0.162l-0.006 0.003 4.484-2.486 5.306 3.063-5.306 3.063-4.483-2.493c-0.175-0.099-0.384-0.157-0.607-0.157-0.691 0-1.25 0.56-1.25 1.25 0 0.467 0.257 0.875 0.637 1.090l0.006 0.003 3.175 1.764-2.421 1.398c-0.381 0.219-0.633 0.623-0.633 1.087 0 0.69 0.559 1.25 1.25 1.25 0.234 0 0.452-0.064 0.639-0.176l-0.006 0.003 2.418-1.396-0.063 3.624c-0 0.006-0 0.014-0 0.021 0 0.683 0.548 1.238 1.228 1.251l0.001 0h0.021c0 0 0 0 0 0 0.683 0 1.238-0.547 1.25-1.227v-0.001l0.089-5.125 5.305-3.063v6.124l-4.397 2.642c-0.366 0.223-0.607 0.619-0.607 1.072 0 0.691 0.56 1.251 1.251 1.251 0.238 0 0.46-0.066 0.649-0.181l-0.006 0.003 3.11-1.869v2.792c0 0.69 0.56 1.25 1.25 1.25s1.25-0.56 1.25-1.25v0-2.792l3.111 1.864c0.182 0.112 0.403 0.178 0.639 0.178 0.001 0 0.001 0 0.002 0h-0c0.001 0 0.001 0 0.002 0 0.69 0 1.25-0.56 1.25-1.25 0-0.453-0.241-0.85-0.602-1.069l-0.006-0.003-4.396-2.634v-6.129l5.303 3.062 0.089 5.131c0.012 0.681 0.566 1.229 1.249 1.229 0 0 0.001 0 0.001 0h0.021c0.681-0.012 1.229-0.567 1.229-1.25 0-0.008-0-0.015-0-0.023l0 0.001-0.063-3.63 2.421 1.397c0.177 0.102 0.39 0.163 0.616 0.163 0.69 0 1.25-0.559 1.25-1.25 0-0.456-0.245-0.856-0.61-1.074l-0.006-0.003-2.418-1.396 3.168-1.762c0.384-0.218 0.639-0.625 0.639-1.090 0-0.69-0.56-1.25-1.25-1.25-0.222 0-0.43 0.058-0.61 0.159l0.006-0.003z"></path></svg>,
    cold: <svg className="svg-resistance" aria-hidden="true" width="24px" height="24px" viewBox="0 0 256 256"><path className="svg-color-resistance" d="M152.00787,147.01562,152,147.02539V48a32,32,0,0,0-64,0v99.02539l-.00787-.00977a52,52,0,1,0,64.01574,0ZM120,208a20,20,0,1,1,20-20A19.9999,19.9999,0,0,1,120,208Z"></path><path className="svg-color-stroke-fill" d="M244.90576,77.71973l-19.96167,6.48632,12.33716,16.98047a8,8,0,1,1-12.94434,9.4043L212,93.61035l-12.33691,16.98047a7.99995,7.99995,0,0,1-12.94434-9.4043l12.33716-16.98047-19.96167-6.48632a8,8,0,1,1,4.94433-15.2168L204,68.98877V48a8,8,0,0,1,16,0V68.98877l19.96143-6.48584a8,8,0,1,1,4.94433,15.2168ZM148,188a28,28,0,1,1-36-26.8291V120a8,8,0,0,1,16,0v41.1709A28.04494,28.04494,0,0,1,148,188Zm-16,0a12,12,0,1,0-12,12A12.01343,12.01343,0,0,0,132,188Zm48,0A60,60,0,1,1,80,143.27441V48a40,40,0,0,1,80,0v95.27441A59.61666,59.61666,0,0,1,180,188Zm-16,0a43.76213,43.76213,0,0,0-16.668-34.4834A7.99255,7.99255,0,0,1,144,147.02539V48a24,24,0,0,0-48,0v99.02539a8.00255,8.00255,0,0,1-3.40918,6.55273A44.00061,44.00061,0,1,0,164,188Z"></path></svg>,
    hot: <svg className="svg-attack" aria-hidden="true" width="24px" height="24px" viewBox="0 0 256 256"><path className="svg-color-attack" d="M152.00787,147.01562,152,147.02539V48a32,32,0,0,0-64,0v99.02539l-.00787-.00977a52,52,0,1,0,64.01574,0ZM120,208a20,20,0,1,1,20-20A19.9999,19.9999,0,0,1,120,208Z"></path><path className="svg-color-stroke-fill" d="M128,161.1709V48a8,8,0,0,0-16,0V161.1709a28,28,0,1,0,16,0ZM120,200a12,12,0,1,1,12-12A12.01343,12.01343,0,0,1,120,200ZM178.05908,85.65723a8.00034,8.00034,0,0,1,0-11.31446,27.99923,27.99923,0,0,1,39.59766,0,12.01214,12.01214,0,0,0,16.9707,0,8.00018,8.00018,0,0,1,11.31348,11.31446,27.99923,27.99923,0,0,1-39.59766,0,12.01214,12.01214,0,0,0-16.9707,0A8.00182,8.00182,0,0,1,178.05908,85.65723Zm67.88184,28.68554a8.00034,8.00034,0,0,1,0,11.31446,27.99923,27.99923,0,0,1-39.59766,0,12.01214,12.01214,0,0,0-16.9707,0,8.00018,8.00018,0,0,1-11.31348-11.31446,27.99923,27.99923,0,0,1,39.59766,0,12.01214,12.01214,0,0,0,16.9707,0A8.00182,8.00182,0,0,1,245.94092,114.34277ZM160,143.27441V48a40,40,0,0,0-80,0v95.27441a60,60,0,1,0,80,0ZM120,232a44.00126,44.00126,0,0,1-27.40918-78.42188A8.00255,8.00255,0,0,0,96,147.02539V48a24,24,0,0,1,48,0v99.02539a7.99255,7.99255,0,0,0,3.332,6.49121A44.00141,44.00141,0,0,1,120,232Z"></path></svg>,
    points: <svg className="svg-food" aria-hidden="true" width="24px" height="24px" viewBox="0 0 24 24"><path className="svg-color-stroke svg-color-food" d="M21.12 9.88005C21.0781 9.74719 20.9996 9.62884 20.8935 9.53862C20.7873 9.4484 20.6579 9.38997 20.52 9.37005L15.1 8.58005L12.67 3.67005C12.6008 3.55403 12.5027 3.45795 12.3853 3.39123C12.2678 3.32451 12.1351 3.28943 12 3.28943C11.8649 3.28943 11.7322 3.32451 11.6147 3.39123C11.4973 3.45795 11.3991 3.55403 11.33 3.67005L8.89999 8.58005L3.47999 9.37005C3.34211 9.38997 3.21266 9.4484 3.10652 9.53862C3.00038 9.62884 2.92186 9.74719 2.87999 9.88005C2.83529 10.0124 2.82846 10.1547 2.86027 10.2907C2.89207 10.4268 2.96124 10.5512 3.05999 10.6501L6.99999 14.4701L6.06999 19.8701C6.04642 20.0091 6.06199 20.1519 6.11497 20.2826C6.16796 20.4133 6.25625 20.5267 6.36999 20.6101C6.48391 20.6912 6.61825 20.7389 6.75785 20.7478C6.89746 20.7566 7.03675 20.7262 7.15999 20.6601L12 18.1101L16.85 20.6601C16.9573 20.7189 17.0776 20.7499 17.2 20.7501C17.3573 20.7482 17.5105 20.6995 17.64 20.6101C17.7537 20.5267 17.842 20.4133 17.895 20.2826C17.948 20.1519 17.9636 20.0091 17.94 19.8701L17 14.4701L20.93 10.6501C21.0305 10.5523 21.1015 10.4283 21.1351 10.2922C21.1687 10.1561 21.1634 10.0133 21.12 9.88005Z"></path></svg>,
    secretPoints: <svg className="svg-secret" aria-hidden="true" width="24px" height="24px" viewBox="0 0 24 24"><path className="svg-color-stroke" fill="none" d="M19 9C19 10.45 18.57 11.78 17.83 12.89C16.75 14.49 15.04 15.62 13.05 15.91C12.71 15.97 12.36 16 12 16C11.64 16 11.29 15.97 10.95 15.91C8.96 15.62 7.25 14.49 6.17 12.89C5.43 11.78 5 10.45 5 9C5 5.13 8.13 2 12 2C15.87 2 19 5.13 19 9Z"></path><path className="svg-color-stroke svg-color-secret" d="M21.2491 18.4699L19.5991 18.8599C19.2291 18.9499 18.9391 19.2299 18.8591 19.5999L18.5091 21.0699C18.3191 21.8699 17.2991 22.1099 16.7691 21.4799L11.9991 15.9999L7.2291 21.4899C6.6991 22.1199 5.6791 21.8799 5.4891 21.0799L5.1391 19.6099C5.0491 19.2399 4.7591 18.9499 4.3991 18.8699L2.7491 18.4799C1.9891 18.2999 1.7191 17.3499 2.2691 16.7999L6.1691 12.8999C7.2491 14.4999 8.9591 15.6299 10.9491 15.9199C11.2891 15.9799 11.6391 16.0099 11.9991 16.0099C12.3591 16.0099 12.7091 15.9799 13.0491 15.9199C15.0391 15.6299 16.7491 14.4999 17.8291 12.8999L21.7291 16.7999C22.2791 17.3399 22.0091 18.2899 21.2491 18.4699Z"></path><path className="svg-color-secret svg-color-stroke" d="M12.58 5.98L13.17 7.15999C13.25 7.31999 13.46 7.48 13.65 7.51L14.72 7.68999C15.4 7.79999 15.56 8.3 15.07 8.79L14.24 9.61998C14.1 9.75998 14.02 10.03 14.07 10.23L14.31 11.26C14.5 12.07 14.07 12.39 13.35 11.96L12.35 11.37C12.17 11.26 11.87 11.26 11.69 11.37L10.69 11.96C9.96997 12.38 9.53997 12.07 9.72997 11.26L9.96997 10.23C10.01 10.04 9.93997 9.75998 9.79997 9.61998L8.96997 8.79C8.47997 8.3 8.63997 7.80999 9.31997 7.68999L10.39 7.51C10.57 7.48 10.78 7.31999 10.86 7.15999L11.45 5.98C11.74 5.34 12.26 5.34 12.58 5.98Z"></path></svg>
  }

  // Import cards and insert and id for each one
  const cards = useRef(require('./cards.json')[0].map((card, index) => {card.id = index; return card;}));
  const secretCards = require('./cards.json')[1].map((card, index) => {card.id = index; return card;});
  const secretCardsAdded = useRef(false);
  // Pick the first 4 cards for the deck on the first turn
  const cardsOnDeck = useRef(cards.current.slice(0, stats.current.intelligence));
  const cardsOnHand = useRef([]);

  const baseTemperatures = {
    spring: 25,
    summer: 33,
    autumn: 16,
    winter: 5
  }
  const idealTemperature = 25;
  const temperatureVariation = 3;
  const turnTotal = 60; // MUST be a multiple of 4
  const SEASONS = 4;
  const seasonFrequency = Math.floor(turnTotal/SEASONS);
  const hatchFrequency = 5;

  const temperature = useRef(baseTemperatures.spring);
  const season = useRef('spring');

  const raid = useRef({
    turn: 0,
    attack: 0,
    soldiers: 0
  });

  // Functions are defined as properties in this object because
  // their names are referenced as a string in cards.json.
  // since each card can call a different function when bought.
  // It's practical to call them with that string like so:
  // actionList['functionName']();
  const actionList = {
    change: (stat, amount) => {
      stats.current[stat] += amount;
    },

    searchFood: () => {
      if (stats.current.ants) {
        let foundFood = stats.current.ants*(stats.current.luck/10 - Math.abs(idealTemperature-temperature.current)/(stats.current.resistance + 20));
        if (foundFood < 0) {foundFood = 0};
        // Round to 1 decimal point
        actionList['change']('food', foundFood);
      }
    },

    hatchEggs: () => {
      if (stats.current.eggs) {
        actionList['change']('ants', stats.current.eggs);
        stats.current.eggs = 0;
      }
    },

    shuffleDeck: () => {
      // Add secret cards
      if (stats.current.intelligence >= 10 && !secretCardsAdded.current) {
        cards.current = cards.current.concat(secretCards);
        secretCardsAdded.current = true;
      }
      // Shuffle cards randomly
      cards.current = cards.current.reduceRight((r,_,__,s) => {
        return (r.push(s.splice(0|Math.random()*s.length,1)[0]), r)}, []);
      cardsOnDeck.current = cards.current.slice(0, Math.floor(stats.current.intelligence));
    },

    cancelRaid: () => {
      raid.current = {
        turn: 0
      };
    },

    generateRaid: () => {
      let minAttackStrength = 0;
      let maxAttackStrength = 0;

      // Decide at which turn the raid will arrive (inside of the season's turns)
      switch (season.current) {
        case 'summer':
          raid.current.turn = Math.round(Math.random() * (seasonFrequency*2 - seasonFrequency) + seasonFrequency);
          maxAttackStrength = 5 - stats.current.luck/2;
          minAttackStrength = 1;
          break;
        case 'autumn':
          raid.current.turn = Math.round(Math.random() * (seasonFrequency*3 - seasonFrequency*2) + seasonFrequency*2);
          maxAttackStrength = 10 - stats.current.luck/2;
          minAttackStrength = 5;
          break;
        default:
          // Don't generate a raid in the last turn
          raid.current.turn = Math.round(Math.random() * ((seasonFrequency*4-1) - seasonFrequency*3) + seasonFrequency*3);
          maxAttackStrength = 20 - stats.current.luck/2;
          minAttackStrength = 10;
          break;
      }

      // Generate attack (raids get stronger each season that passes, and luck influences the attack generated)
      raid.current.attack = Math.round(Math.random() * (maxAttackStrength - minAttackStrength) + minAttackStrength);

      // Generate ant amount
      raid.current.soldiers = Math.round(Math.random() * ((stats.current.ants + 100) - 50) + 50);
    },

    runRaid: () => {
      if (stats.current.attack < raid.current.attack) {
        stats.current.ants -= raid.current.soldiers - Math.round(stats.current.resistance);
        if (stats.current.ants < 0) stats.current.ants = 0;
        stats.current.food -= raid.current.soldiers - Math.round(stats.current.resistance);
        if (stats.current.food < 0) stats.current.food = 0;
      } else {
        stats.current.ants += raid.current.soldiers;
      }
    },

    worldDomination: () => {
      // Add the amount of people in the planet
      // It's a string because this number is too big to be an integer
      stats.current.people = '8000000000';
      // Trigger results screen
      setTurn(turnTotal+1);
    },

    endTurn: () => {
      // Ants search for food
      actionList['searchFood']();

      // Queen lays eggs
      actionList['change']('eggs', Math.floor(stats.current.fertility));

      // Hatch eggs every 5 turns, except for the last turn
      if (!(turn % hatchFrequency) && turn !== turnTotal) {
        actionList['hatchEggs']();
      }

      // Change season & generate one raid and raidTurn each season.
      // A raid card appears on the deck when turn === raidTurn.
      if (!(turn % seasonFrequency) && turn !== turnTotal) {
        switch (turn) {
          case seasonFrequency:
            season.current = 'summer';
            actionList['generateRaid']();
            break;
          case seasonFrequency*2:
            season.current = 'autumn';
            actionList['generateRaid']();
            break;
          default:
            season.current = 'winter';
            actionList['generateRaid']();
            break;
        }
      }

      // Change temperature
      const turnVariation = Math.round(Math.random() * (temperatureVariation - temperatureVariation*-1) + temperatureVariation*-1);
      temperature.current = baseTemperatures[season.current] + turnVariation;

      // Turn-based bonuses
      if (stats.current.peopleBonus) {actionList['change']('people', stats.current.peopleBonus);}
      if (stats.current.fertilityBonus) {actionList['change']('fertility', stats.current.fertilityBonus);}
      if (stats.current.intelligenceBonus) {actionList['change']('intelligence', stats.current.intelligenceBonus);}
      if (stats.current.resistanceBonus) {actionList['change']('resistance', stats.current.resistanceBonus);}
      if (stats.current.attackBonus) {actionList['change']('attack', stats.current.attackBonus);}
      if (stats.current.luckBonus) {actionList['change']('luck', stats.current.luckBonus);}

      // Shuffle cards
      actionList['shuffleDeck']();

      setTurn(oldTurn => oldTurn + 1);
    },

    buyFromDeck: (card) => {
      // Bought card gets added at the beginning of the array
      cardsOnHand.current = [card].concat(cardsOnHand.current);
    }
  }

  function saveTheme(theme) {
    localStorage.setItem('theme', theme);
  }

  function getTheme() {
    return localStorage.getItem('theme') ? localStorage.getItem('theme') : 'classic';
  }

  function changeTheme(theme) {
    saveTheme(theme);
    setTheme(theme);
  }

  return (
    <div className={theme + ' theme'}>
      <header>
        <h1>Ant manager</h1>
        <ThemeSelector onChange={changeTheme} selected={theme}/>
      </header>
      <div className="container">
        { (turn > turnTotal) ?
          <div aria-live="polite" aria-atomic="true">
            <Results
              svgs={svgs}
              people={stats.current.people}
              ants={stats.current.ants}
              eggs={stats.current.eggs}
              food={stats.current.food}
              eggPointValue={eggPointValue}
              foodPointValue={foodPointValue}
              cardsOnHand={cardsOnHand.current}
            />
          </div>
           : 
           <>
           {/* This div needs to be here so that the screen reader takes note of its presence and announces the results when they load inside of it */}
           <div aria-live="polite" aria-atomic="true"></div>
            <Info
              svgs={svgs}
              people={stats.current.people}
              peopleBonus={stats.current.peopleBonus}
              ants={stats.current.ants}
              eggs={stats.current.eggs}
              food={stats.current.food}
              fertility={stats.current.fertility}
              fertilityBonus={stats.current.fertilityBonus}
              intelligence={stats.current.intelligence}
              intelligenceBonus={stats.current.intelligenceBonus}
              resistance={stats.current.resistance}
              resistanceBonus={stats.current.resistanceBonus}
              attack={stats.current.attack}
              attackBonus={stats.current.attackBonus}
              luck={stats.current.luck}
              luckBonus={stats.current.luckBonus}
              turn={turn}
              turnTotal={turnTotal}
              hatchFrequency={hatchFrequency}
              seasonFrequency={seasonFrequency}
              season={season.current}
              temperature={temperature.current}
              idealTemperature={idealTemperature}
              eggPointValue={eggPointValue}
              foodPointValue={foodPointValue}/>
              <Deck
                svgs={svgs}
                cards={cardsOnDeck.current}
                actionList={actionList}
                food={stats.current.food}
                eggs={stats.current.eggs}
                ants={stats.current.ants}
                people={stats.current.people}
                fertility={stats.current.fertility}
                intelligence={stats.current.intelligence}
                resistance={stats.current.resistance}
                attack={stats.current.attack}
                luck={stats.current.luck}
                turn={turn}
                raid={raid.current}
                />
              <Hand svgs={svgs} cards={cardsOnHand.current}
            />
          </>
        }
      </div>
      <Footer />
    </div>
  );
}

export default App;