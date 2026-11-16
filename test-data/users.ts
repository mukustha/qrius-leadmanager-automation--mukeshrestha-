export interface UserCredentials {
  username: string;
  password: string;
  role: 'ADMIN' | 'AGENT';
}

export const users = {
  admin: {
    username: 'admin.qrius',
    password: 'Admin@123',
    role: 'ADMIN',
  },
  agent: {
    username: 'agent.qrius',
    password: 'Agent@123',
    role: 'AGENT',
  },
  invalidPassword: {
    username: 'admin.qrius',
    password: 'NotThePassword',
    role: 'ADMIN',
  },
} satisfies Record<string, UserCredentials>;
