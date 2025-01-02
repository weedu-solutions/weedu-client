import styled from 'styled-components'

export const Container = styled.div`
  padding: 20px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;

  &:hover .tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

export const InfoIcon = styled.span`
  font-size: 14px;
  cursor: help;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  background: #1e293b;
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 0.875rem;
  width: 280px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-5px);
  transition: all 0.2s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  &:before {
    content: '';
    position: absolute;
    top: -4px;
    left: 20px;
    width: 8px;
    height: 8px;
    background: #1e293b;
    transform: rotate(45deg);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  font-weight: 500;
  color: #64748b;
  background: white;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }
`;

export const ConfirmButton = styled.button`
  flex: 1;
  padding: 12px;
  background: #7956F7;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: #6744f5;
  }
`;

export const Legend = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: #F8F9FC;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const LegendIcon = styled.span`
  font-size: 16px;
  line-height: 1.2;
`;

export const LegendText = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.4;
`;

