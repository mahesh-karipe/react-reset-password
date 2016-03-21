import React from 'react';
import ReactDOM from 'react-dom';
import ResetPassword from './lib/ResetPassword.jsx';

ReactDOM.render(<ResetPassword minLength={6}
                               shouldContainUpperCase={true}
                               shouldContainLowerCase={true}
                               shouldContainSpecialCharacter={true}
                               shouldContainNumber={true} />,
                document.getElementById('app'));
