type UserParams = {
  email: string;
  password: string;
};

type UserResponse = {
  accessToken: string;
  user: {
    email: string;
  };
};

export const createUser = ({ email, password }: UserParams): Promise<UserResponse> => {
  return fetch("http://localhost:3001/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("User already exists");
    }
    return response.json();
  });
};

export const loginUser = ({ email, password }: UserParams): Promise<UserResponse> => {
  return fetch("http://localhost:3001/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Invalid email or password");
    }
    return response.json();
  });
};
