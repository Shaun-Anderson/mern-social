import React from 'react';
import { useStore } from '../../common/useStore'

export default function Login() {
  const { authStore: { isAuthorized } } = useStore()
  return (
      <div>This is secure</div>
  );
}

