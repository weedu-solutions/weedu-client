import { Button } from '@chakra-ui/react'

interface IButtonDefaultProps {
    color?: string;
    onClick: any;
    backgroundColor: string;
    border?: string;
    borderColor?: string;
    width?: string;
    height?: string;
    loading?: boolean;
    title: string;
    loadingText?: string;
}


export function ButtonDefault({
    color,
    onClick,
    backgroundColor,
    border,
    borderColor,
    width,
    height,
    loading,
    title,
    loadingText
}: IButtonDefaultProps) {

    return (
        <Button
            borderRadius={'4px'}
            loadingText={loadingText ? loadingText : ''}
            isLoading={loading}
            onClick={onClick}
            bgColor={backgroundColor}
            color={color ? color : '#FFFFFF'}
            border={border ? border : '0px'}
            borderColor={borderColor}
            w={width}
            h={height}
            fontSize='14px'
            fontWeight='500'
            letterSpacing='0.5px'
        >
            {title}
        </Button>
    )

}

