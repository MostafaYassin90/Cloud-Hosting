import { Article, Comment, User } from "@prisma/client";

export type TCreateUser = {
  username: string;
  email: string;
  password: string;
};
export type TArticles = {
  id: number;
  title: string;
  description: string;
}
export type TLoginUser = {
  email: string;
  password: string;
};

export type TCreateArticle = {
  title: string;
  description: string;
};

export type TCreateComment = {
  text: string;
  articleId: number
};
export type TUpdateComment = {
  text?: string,
  articleId?: number
}

export type TJwtPayload = {
  id: number;
  username: string;
  isAdmin: boolean
}

export type CommentAndUser = Comment & { user: User }
export type TSingleArticle = Article & { comments: CommentAndUser[] }

