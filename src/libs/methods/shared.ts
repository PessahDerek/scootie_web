

export function readable(word: string){
  return word.replace("_", " ").split('').map((char, i)=>i===0 ? char.toUpperCase() : char).join("")
}
