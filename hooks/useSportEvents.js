import { gql, useQuery } from '@apollo/client';

// query for boxing games
const BOXING_QUERY = `
  query BoxingGames($where: Game_filter!) {
    games(first: 10, where: $where) {
      id
      sport {
        name
      }
      participants {
        name
        image
      }
      startsAt
    }
  }
`;

// query for football games
const FOOTBALL_QUERY = `
  query FootballGames($where: Game_filter!) {
    games(first: 10, where: $where) {
      id
      sport {
        name
      }
      league {
        name
        country {
          name
        }
      }
      participants {
        name
        image
      }
      startsAt
    }
  }
`;

// query for basketball games
const BASKETBALL_QUERY = `
  query BasketballGames($where: Game_filter!) {
    games(first: 10, where: $where) {
      id
      sport {
        name
      }
      league {
        name
        country {
          name
        }
      }
      participants {
        name
        image
      }
      startsAt
    }
  }
`;

export default function useSportEvents() {
  // retrieve boxing games
  const { loading: boxingLoading, data: boxingData } = useQuery(gql`${BOXING_QUERY}`, {
    variables: {
      where: {
        startsAt_gt: Math.floor(Date.now() / 1000),
        sport_: { name: 'Boxing' },
      },
    },
  });

  // retrieve football games
  const { loading: footballLoading, data: footballData } = useQuery(gql`${FOOTBALL_QUERY}`, {
    variables: {
      where: {
        startsAt_gt: Math.floor(Date.now() / 1000),
        sport_: { name: 'Football' },
      },
    },
  });

  // retrieve basketball games
  const { loading: basketballLoading, data: basketballData } = useQuery(gql`${BASKETBALL_QUERY}`, {
    variables: {
      where: {
        startsAt_gt: Math.floor(Date.now() / 1000),
        sport_: { name: 'Basketball' },
      },
    },
  });

  const games = [
    ...(boxingData?.games || []),
    ...(footballData?.games || []),
    ...(basketballData?.games || []),
  ];

  return { loading: boxingLoading || footballLoading || basketballLoading, data: { games } };
}


