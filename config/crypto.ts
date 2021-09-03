interface cryptoProps {
  jwt: {
    privateKey: string;
    publicKey: string;
    duration: string;
  };
  refreshToken: {
    duration: number;
  }
  hashSaltRounds: string | number;
}

const crypto: cryptoProps = {
  hashSaltRounds: 10,
  jwt: {
    privateKey: process.env.JWT_PRIVATE_KEY,
    publicKey: process.env.JWT_PUBLIC_KEY,
    duration: '1d',
  },
  refreshToken: {
    duration: 1000 * 60 * 60 * 24 * 7,
  },
}

export {
  crypto
}

