import { TopicMention } from './types';
import cls from './styles.module.css';
import { TopicMentionCard } from '../TopicMentionCard/TopicMentionCard';
import { FC } from 'react';

type Props = {
  topicMentions: TopicMention[];
  onClick: (topicMentionValue: string) => void;
  selected?: string;
};

export function TopicMentions({ onClick, topicMentions, selected }: Props) {
  return (
    <div className={cls.container}>
      {topicMentions.map((tm) => (
        <TopicMentionCard
          key={tm.topicMentionId}
          count={tm.count}
          name={tm.topicMentionValue}
          isSelected={selected === tm.topicMentionValue}
          onClick={() => onClick(tm.topicMentionValue)}
        />
      ))}
    </div>
  );
}

export type TopicMentionsComponent = FC<Props>;
