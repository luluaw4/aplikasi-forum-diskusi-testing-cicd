import VoteButtons from '../components/VoteButtons';

const meta = {
  title: 'Forum/VoteButtons',
  component: VoteButtons,
  tags: ['autodocs'],
  args: {
    upCount: 12,
    downCount: 2,
    isUpVoted: false,
    isDownVoted: false,
    onUpVote: () => {},
    onDownVote: () => {},
  },
};

export default meta;

export const Default = {};

export const UpVoted = {
  args: {
    isUpVoted: true,
  },
};
