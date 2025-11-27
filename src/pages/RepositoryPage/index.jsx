import React from 'react';
import { useParams } from 'react-router-dom';
import { Repository } from '../../components/Repository';

export function RepositoryPage() {
  const { owner, repo } = useParams();
  const fullName = `${owner}/${repo}`;

  return (
    <div>
      <Repository repository={{ fullName }} />
    </div>
  );
}
