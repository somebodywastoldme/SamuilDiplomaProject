
interface RecipientGrid {
  name: string;
  surname: string;
}

interface SenderGrid {
  name: string;
  surname: string;
}

interface CardGrid {
  documents: Document[];
}

interface DocumentGrid {
  fileName: string;
  description: string;
}
interface ISentCardGrid {
  id: number;
  recipient: RecipientGrid;
  sender: SenderGrid;
  cardId: number;
  card: CardGrid;
  createdAt: string;
  document
}

export default class SentCardGrid implements ISentCardGrid {
  public id: number;
  public recipient: RecipientGrid;
  public sender: SenderGrid;
  public cardId: number;
  public card: CardGrid;
  public createdAt: string;
}
