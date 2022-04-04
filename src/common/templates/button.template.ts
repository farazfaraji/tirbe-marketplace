export function button(text: string, id?: string) {
  // eslint-disable-next-line quotes,max-len
  return `<button id='${id}' type='button' class='items-center relative focus:outline-none focus-visible:ring text-basicSurface-500 bg-surface-50 hover:bg-surface-100 font-medium shadow-sm px-4 py-2 text-sm rounded-md border border-basicSurface-300/25 w-full flex justify-center group'><span id='${id}' class='flex'><span id='${id}' class='inline-flex items-center'>${text}</span></span></button>`
}
