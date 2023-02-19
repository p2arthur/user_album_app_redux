import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Creating an API using RTK Query for things related to albums - createApi({options})
const albumsApi = createApi({
  //Key for our 'store'
  reducerPath: "albums",

  //Configuration property that in this case uses a pre created function called fetchBaseQuery
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),

  //Configuring the endpoints to our requests
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        query: (user) => {
          return {
            url: "/albums",
            params: {
              userId: user.id,
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchAlbumsQuery } = albumsApi;
export { albumsApi };
