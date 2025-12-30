declare global {
  interface GetAllLocationsParams {
    page?: number;
    pageSize?: number;
    query?: string;
  }

  interface RouteParams {
    params: Promise<Record<string, string>>;
    searchParams: Promise<Record<string, string>>;
  }

  interface PaginatedLocations {
    locations: LocationData[];
    isNext: boolean;
  }

  interface GetLocationParams {
    locationId: string;
  }

  interface LocationResponse {
    location: LocationData;
  }

  interface SignInParams {
    email: string;
    password: string;
  }

  interface SignUpParams {
    firstName: string;
    lastName?: stirng;
    email: string;
    password: string;
  }
}

export {};
