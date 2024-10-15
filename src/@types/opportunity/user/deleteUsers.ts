export type DeleteUsersRequestBodyData = {
  ids: string;
};

export type DeleteUsersResponseData = {
  statusCode: number;
  data: {
    ids: string;
  };
};
