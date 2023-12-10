import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const TagsUpdater = ({ currentTags, onUpdateTags }) => {
  const [selectedTags, setSelectedTags] = useState(currentTags.map(tag => ({ value: tag, label: tag })) || []);

  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
    onUpdateTags(selectedOptions.map(option => option.value)); // Actualiza las etiquetas seleccionadas en el estado principal
  };

  const handleTagRemoval = (tagToRemove) => {
    const updatedTags = selectedTags.filter(tag => tag.value !== tagToRemove);
    setSelectedTags(updatedTags);
    onUpdateTags(updatedTags.map(tag => tag.value)); // Actualiza las etiquetas seleccionadas en el estado principal sin la etiqueta removida
  };

  return (
    <div>
      <h4>Etiquetas existentes:</h4>
      {selectedTags.map((tag, index) => (
        <span key={index} className="tag" onClick={() => handleTagRemoval(tag.value)}>
          {tag.label} (Eliminar)
        </span>
      ))}

      <Select
        isMulti
        options={currentTags.map(tag => ({ value: tag, label: tag }))}
        value={selectedTags}
        onChange={handleTagChange}
      />
    </div>
  );
};

export default TagsUpdater;
