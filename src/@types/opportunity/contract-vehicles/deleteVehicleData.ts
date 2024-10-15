export type DeleteVehicleRequestBodyType = { ids: string };

export type DeleteVehicleResponseType = {
  statusCode: number;
  data: {
    ids: string;
  };
};
