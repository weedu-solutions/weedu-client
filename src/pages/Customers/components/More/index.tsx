import { MdMoreVert } from 'react-icons/md';
import { Button, Wrapper } from './styled';

interface Props {
  onBlock(): void;
  onEdit(): void;
}

export function More({ onEdit, onBlock}: Props) {
  return (
    <Wrapper>
      <Button><MdMoreVert /></Button>
      <div className="dropdown">
        <button onClick={onEdit}>Editar detalhes</button>
        <button onClick={onBlock}>Bloquear Usuário</button>
      </div>
    </Wrapper>
  )
}
