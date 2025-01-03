import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 500px), 1fr));
  gap: 32px;
  padding: 24px;
  width: 100%;
  background: #f8fafc;
`;

export const GraphCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const GraphHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
`;

export const GraphTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0f172a;
  letter-spacing: -0.02em;
  line-height: 1.4;
`;

export const GraphSubtitle = styled.span`
  font-size: 14px;
  color: #64748b;
  font-weight: 400;
  margin-top: 4px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GraphContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ChartWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  height: 300px;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    gap: 24px;
  }
`;

export const ChartContainer = styled.div`
  flex: 1;
  height: 100%;
  min-width: 0; // Evita overflow em containers flex
  
  @media (max-width: 768px) {
    width: 100%;
    height: 250px;
  }
`;

export const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  min-width: 180px;

  @media (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #475569;
  padding: 6px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
  }

  @media (max-width: 768px) {
    min-width: 140px;
  }
`;

export const ColorBox = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 4px;
  background: ${({ color }) => color};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const TooltipContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`;

export const TooltipLabel = styled.div`
  font-size: 12px;
  color: #64748b;
  margin-bottom: 4px;
`;

export const TooltipValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
`;

