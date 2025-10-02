import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { useAuth } from '../../contexts/useAuth';

function LabTerminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const term = useRef<any>(null);

  useEffect(() => {
    if (terminalRef.current) {

      term.current = new Terminal({
        cols: 80,
        rows: 24,
        fontSize: 14,
        fontFamily: 'monospace',
        theme: {
          background: '#1e1e1e',
          foreground: '#ffffff',
        },
      });

      term.current.open(terminalRef.current);

      // For demo, echo input

      term.current.onData((data: string) => {
        term.current?.write(data);
      });

      term.current.write('Welcome to the Cybersecurity Lab Terminal!\r\n$ ');

      // TODO: Integrate with Terminal.shop API
      // Fetch session from API and connect via WebSocket
    }

    return () => {
      term.current?.dispose();
    };
  }, []);

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Lab <span className="text-lime-500">Terminal</span>
      </h1>
      <div className="bg-gray-900 p-4 rounded-lg">
        <div ref={terminalRef} className="w-full h-96"></div>
      </div>
    </div>
  );
}

export default function Labpage() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Access Restricted
        </h2>
        <p className="text-gray-600 mb-6">
          You need to be signed in to access the Lab Terminal.
        </p>
        <Link
          to="/signin"
          className="bg-lime-500 text-white px-6 py-3 rounded-lg hover:bg-lime-600 transition-colors"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return <LabTerminal />;
}