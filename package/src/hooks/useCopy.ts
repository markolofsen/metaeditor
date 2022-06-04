import * as React from 'react'

export const useCopy = () => {

  const cls = new class {
    text(text: string) {
      navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
        alert('Copied!')
      }, function (err) {
        console.error('Async: Could not copy text: ', err);
      });
    }
  }

  return cls
}