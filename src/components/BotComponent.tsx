import React from 'react';
import Image from 'next/image';
import { UploadDoc } from './UploadDoc';
import { ListDocs } from './ListDocs';
import { SignInButton } from './SignInButton';
import { QueryForm } from './QueryForm';
import { AnswerBox } from './AnswerBox';
//import { getSession } from '@/lib/auth';

const BotComponent: React.FC = () => {
    const [answer, setAnswer] = React.useState<string>('');
    //const session = await getSession(); // Mock auth session
    const session = {
        "user": {
            "name": 'John Doe',
            "email": ''
    }};
    const getAnswer = (text: string) => {
        setAnswer(text);
    }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-10">
        <div className="max-w-5xl mx-auto space-y-10">
            <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Document Search Bot</h1>
            {session?.user && (
                <div className="text-sm text-gray-600">
                    Logged in as <strong>{session.user.name}</strong>
                </div>
            )}
            {!session?.user && <SignInButton />}
            <div className="flex space-x-4">
                {session?.user && (
                    <>
                    <UploadDoc />
                    <ListDocs />
                    </>
                )}                            
            </div>
        </header>

        <section className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <QueryForm onAnswer={getAnswer}/>
            <AnswerBox answer={answer}/>
        </section>
        </div>      
    </main>
  );
};

export default BotComponent;