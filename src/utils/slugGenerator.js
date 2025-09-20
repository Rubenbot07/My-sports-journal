export const slugGenerator = (title, maxLen = 50) => {
        return title
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')              
        .slice(0, maxLen)                 
        .replace(/^-+|-+$/g, '')         
}