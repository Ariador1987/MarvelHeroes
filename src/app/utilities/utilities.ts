import { Hero } from "../models/hero";

export const constructImgPath = (thumbPath: string, thumbExtension: string) => {
    return `${thumbPath}.${thumbExtension}`;
};

export function mapToTypeHero(inputArr: any[]): Hero[] {
    const deconstructedArr = inputArr.map((item) => {
        const {
            id,
            name,
            description,
            comics: { available },
            thumbnail: { path },
            thumbnail: { extension },
        } = item;

        return { id, name, description, path, extension, available };
    });

    const heroTypedArr = deconstructedArr.map((item) => {
        const heroObj = {
            id: item.id,
            name: item.name,
            description: item.description,
            appearances: item.available,
            image: constructImgPath(item.path, item.extension),
            isFavorite: false,
        };

        return heroObj;
    });

    return heroTypedArr;
}

export function doesItemExist(
    bookmarksArr: Hero[],
    newBookmarkId: number
): boolean {
    return bookmarksArr.some((item) => item.id === newBookmarkId);
}
