import styled from 'styled-components'

export const Container = styled.div`
  padding: 16px;
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

export const DateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 0.875rem;
  color: #64748b;
`;

export const CalendarWrapper = styled.div`
  .calendar-custom {
    width: 100%;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 8px;
    background: white;
    
    .react-calendar__navigation {
      display: flex;
      margin-bottom: 8px;
      
      button {
        background: none;
        padding: 4px;
        border-radius: 4px;
        color: #1e293b;
        font-size: 0.875rem;
      }
    }
    
    .react-calendar__month-view__weekdays {
      text-align: center;
      text-transform: uppercase;
      font-weight: 600;
      font-size: 0.75rem;
      color: #64748b;
      margin-bottom: 4px;
      
      abbr {
        text-decoration: none;
      }
    }
    
    .react-calendar__tile {
      padding: 4px;
      font-size: 0.813rem;
      border-radius: 4px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover:enabled {
        background: #f1f5f9;
      }
      
      &--active {
        background: #7956F7 !important;
        color: white !important;
      }
      
      &--now {
        background: #f8fafc;
      }
    }
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #dc2626;
  background: #fef2f2;
  border: 1px solid #fee2e2;
  padding: 12px;
  border-radius: 8px;
  font-size: 0.875rem;
  margin-top: 16px;
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

export const SaveButton = styled.button`
  flex: 1;
  padding: 12px;
  background: #7956F7;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #6744f5;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

