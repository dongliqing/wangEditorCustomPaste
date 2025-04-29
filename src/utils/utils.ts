

/**
 * 动态引入图片
 */
export function getImageUrl(name: string, directory?: string) {
    const path = directory ? `${directory}/${name}` : name;
    return new URL(`/src/assets/${path}`, import.meta.url).href;
}


