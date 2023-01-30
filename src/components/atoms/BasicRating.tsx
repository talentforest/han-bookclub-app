import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import styled from 'styled-components';

interface IRatingProps {
  rating: number | null;
  setRating?: (value: number | null) => void;
  readOnly?: boolean;
}

export default function BasicRating({
  rating,
  setRating,
  readOnly,
}: IRatingProps) {
  return (
    <RatingBox
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      {readOnly ? (
        <Rating
          size='small'
          name='read-only'
          precision={0.5}
          value={rating}
          readOnly
        />
      ) : (
        <Rating
          name='half-rating'
          value={rating}
          precision={0.5}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      )}
    </RatingBox>
  );
}

const RatingBox = styled(Box)`
  svg {
    fill: #ffbb00;
  }
`;
