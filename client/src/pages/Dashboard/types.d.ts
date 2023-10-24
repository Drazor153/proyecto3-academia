type PostType = {
    id: number;
    title: string;
    content: string;
    author: string;
    category: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    image?: string;
};

export { PostType }