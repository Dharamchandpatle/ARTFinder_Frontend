import React from 'react';

const InsightComponent = ({ text }) => {
  const formatInsight = (text) => {
    if (!text) return '';

    let formattedText = text;

    // Convert **bold** to <strong> tags
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Format sections: Quick and Precise Analysis, Competitor Data, Recommendations, Best Links, Hashtags
    const sections = [
      { name: 'Quick and Precise Analysis' },
      { name: 'Competitor Data' },
      { name: 'Recommendations' },
      { name: 'Best Links' },
      { name: 'Hashtags' },
    ];

    sections.forEach(section => {
      const regex = new RegExp(`(${section.name}.*?)(?=(?:${sections.map(s => s.name).join('|')}|$))`, 'gs');
      formattedText = formattedText.replace(
        regex,
        (match) => {
          return `
            <div>
              <h3 style="color: #2D3748; font-weight: bold; margin-bottom: 8px; font-size: 1.5em;">${section.name}</h3>
              <p style="font-size: 1em; line-height: 1.5;">
                ${match.replace(/^\s*(.*)/gm, '<p>&#8226; $1</p>')}
              </p>
            </div>
          `;
        }
      );
    });

    // Wrap any remaining unformatted text in <p> tags
    formattedText = formattedText.replace(/([^\n]+)/g, '<p>$1</p>');

    return formattedText;
  };

  return (
    <div className="insight-container" style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <div
        className="insight-text"
        dangerouslySetInnerHTML={{ __html: formatInsight(text) }}
        style={{ color: '#4A5568', lineHeight: '1.6', fontSize: '1em' }}
      />
    </div>
  );
};

export default InsightComponent;
