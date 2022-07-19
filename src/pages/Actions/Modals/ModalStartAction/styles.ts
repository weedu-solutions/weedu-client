import styled from 'styled-components'


export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const Separator = styled.div`
    width: 100%;
    height: 2px;
    background-color: #EFF0F1;
    margin-top: 10px;
`
export const Title = styled.div`
    width: 100%;
    height: 10%;
    align-items: center;
    display: flex;
    justify-content: center;
    justify-content: space-between;
    
    h1 {
        font-weight: 700;
        font-size: 25px;
    }

`
export const SubTitle = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 10px;
    
    h1 {
        font-size: 15px;
        font-weight: 700;
        color: #000000;
    }
`
export const Form = styled.div`
    width: 80%;
    margin-top: 20px;
`
export const Footer = styled.div`
    width: 80%;
    margin-top: 40px;
    margin-bottom: 40px;
`

export const CalendarCss = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;

    /* background-color: red; */
    .react-calendar { 
        width: 500px;
        max-width: 100%;
        background-color: #fff;
        color: #222;
        border-radius: 8px;
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
        border: 0;
        padding: 20px;
        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.125em;
    }
    .react-calendar__navigation button {
        color: #6f48eb;
        min-width: 44px;
        background: none;
        font-size: 16px;
        margin-top: 8px;
    }
    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
        background-color: #f8f8fa;
    }
    .react-calendar__navigation button[disabled] {
        background-color: #f0f0f0;
    }
    abbr[title] {
        text-decoration: none;
    }

    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
        background: #f8f8fa;
        color: #6f48eb;
        border-radius: 6px;
    }
    .react-calendar__tile--now {
        background: #6f48eb33;
        border-radius: 6px;
        font-weight: bold;
        color: #6f48eb;
    }
    .react-calendar__tile--now:enabled:hover,
    .react-calendar__tile--now:enabled:focus {
        background: #6f48eb33;
        border-radius: 6px;
        font-weight: bold;
        color: #6f48eb;
    }
    .react-calendar__tile--hasActive:enabled:hover,
    .react-calendar__tile--hasActive:enabled:focus {
        background: #f8f8fa;
    }
    .react-calendar__tile--active {
        background: #6f48eb;
        border-radius: 6px;
        font-weight: bold;
        color: white;
    }
    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus {
        background: #6f48eb;
        color: white;
    }
    .react-calendar--selectRange .react-calendar__tile--hover {
        background-color: #f8f8fa;
    }
    .react-calendar__tile--range {
        background: #f8f8fa;
        color: #6f48eb;
        border-radius: 0;
    }
    .react-calendar__tile--rangeStart {
        border-radius: 6px;
        background: #6f48eb;
        color: white;
    }
    .react-calendar__tile--rangeEnd {
        border-radius: 6px;
        background: #6f48eb;
        color: white
    }
`

