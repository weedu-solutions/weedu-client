import { MdMoreVert } from 'react-icons/md';
import { Button, Wrapper } from './styled';

interface Props {
  onBlock(): void;
  onEdit(): void;
  userRow: any;
}

export function More({ onEdit, onBlock, userRow }: Props) {
  return (
    <Wrapper>
      <Button><MdMoreVert /></Button>
      <div className="dropdown">
        <button onClick={onEdit}>Editar detalhes</button>
        <button onClick={onBlock}>{userRow.is_active === 1 ? 'Bloquear funcionário' : 'Desbloquear funcionário'}</button>
      </div>
    </Wrapper>
  )
}
