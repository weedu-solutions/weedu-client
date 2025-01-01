import React from 'react';
import ContentLoader from 'react-content-loader';
import * as S from './styles';

interface BoardLoaderProps {
  columns?: number;
  cardsPerColumn?: number;
  backgroundColor?: string;
  foregroundColor?: string;
}

export function BoardLoader({
  columns = 5,
  cardsPerColumn = 3,
  backgroundColor = "#eaeced",
  foregroundColor = "#ffffff"
}: BoardLoaderProps) {
  return (
    <S.Container>
      {Array.from({ length: columns }).map((_, columnIndex) => (
        <S.Column key={`column-${columnIndex}`}>
          <ContentLoader
            width={280}
            height={450}
            viewBox="0 0 280 450"
            backgroundColor={backgroundColor}
            foregroundColor={foregroundColor}
          >
            {/* Column Header */}
            <rect x="0" y="0" rx="8" ry="8" width="280" height="40" />

            {/* Cards */}
            {Array.from({ length: cardsPerColumn }).map((_, cardIndex) => {
              const cardY = 60 + (cardIndex * 140);
              return (
                <React.Fragment key={`card-${columnIndex}-${cardIndex}`}>
                  <rect x="0" y={cardY} rx="6" ry="6" width="60" height="20" />
                  <rect x="0" y={cardY + 30} rx="4" ry="4" width="280" height="24" />
                  <rect x="0" y={cardY + 64} rx="4" ry="4" width="140" height="16" />
                  <rect x="0" y={cardY + 90} rx="4" ry="4" width="120" height="16" />
                </React.Fragment>
              );
            })}
          </ContentLoader>
        </S.Column>
      ))}
    </S.Container>
  );
}