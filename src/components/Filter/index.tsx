import { Button } from "native-base";
import { theme } from "../../theme";

interface IFilterProps {
  pressed: boolean;
  title: string;
}

export function Filter({ pressed, title }: IFilterProps) {
  return (
    <Button
      variant="outline"
      borderRadius="16px"
      background={pressed ? theme.colors.primary.medium : '#fff'}
      borderColor={pressed ? theme.colors.primary.medium : "#1E163E"}
      _text={{
        color: pressed ? '#fff' : theme.colors.primary.dark
      }}
      _hover={{
        background: theme.colors.primary.ligther,
        borderColor: pressed ? theme.colors.primary.ligther : theme.colors.primary.dark
      }}
      marginRight="2"
      isLoading
    >
      {title}
    </Button>
  )
}
