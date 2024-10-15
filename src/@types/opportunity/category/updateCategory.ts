export type UpdateCategoryRequestBodyType = {
  category: {
    parent_id: number;
    name: string;
  };
  ID?: number;
};

export type UpdateCategoryResponseType = {
  statusCode: number;
  data: {
    ID: number;
    children: null;
    parent: null;
    parent_id: null;
    title: string;
    icon_url: string;
    color: string;
    user: null;
    user_id: number;
    rate: number;
    recipes: null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
  };
};
