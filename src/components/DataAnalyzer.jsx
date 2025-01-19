import React from 'react';

const InsightComponent = ({ text }) => {
  const formatInsight = (text) => {
    // Replace **some text** with <strong>some text</strong> to make it bold
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

     // Split the text by each numbered point (1., 2., 3., etc.) and wrap each point in a <p> tag for new lines
     formattedText = formattedText.replace(/(\d+\.)/g, '<br /><p>$1');

     // Close the last paragraph tag
     formattedText += '</p>';
    return formattedText;
  };

  return (
    <div className="insight-container">
      <p
        className="insight-text"
        dangerouslySetInnerHTML={{ __html: formatInsight(text) }}
      />
    </div>
  );
};

export default InsightComponent;
