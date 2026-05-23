import { useState } from 'react';
import { Button } from '../components/Button';
import { Select } from '../components/Select';
import { Trash2 } from 'lucide-react';

const exerciseOptions = [
  { value: 'dumbbell_side_raise', label: 'Dumbbell Side Raise' },
  { value: 'bench_press', label: 'Bench Press' },
  { value: 'squat', label: 'Squat' },
  { value: 'deadlift', label: 'Deadlift' },
];

function Record() {
  const [exercises, setExercises] = useState([
    {
      id: 1,
      type: 'dumbbell_side_raise',
      goal: 100,
      sets: [
        { id: 1, reps: 6, weight: 8 },
        { id: 2, reps: 6, weight: 8 },
        { id: 3, reps: 6, weight: 8 },
      ]
    },
    {
      id: 2,
      type: '',
      goal: '',
      sets: []
    }
  ]);

  const handleAddSet = (exerciseId) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          sets: [...ex.sets, { id: ex.sets.length > 0 ? Math.max(...ex.sets.map(s => s.id)) + 1 : 1, reps: '', weight: '' }]
        };
      }
      return ex;
    }));
  };

  const handleRemoveSet = (exerciseId, setId) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        return { ...ex, sets: ex.sets.filter(s => s.id !== setId) };
      }
      return ex;
    }));
  };

  const handleSetChange = (exerciseId, setId, field, value) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          sets: ex.sets.map(s => s.id === setId ? { ...s, [field]: value } : s)
        };
      }
      return ex;
    }));
  };

  const handleExerciseChange = (exerciseId, field, value) => {
    let updatedExercises = exercises.map(ex => {
      if (ex.id === exerciseId) {
        if (field === 'type' && !ex.type && value) {
          return { 
            ...ex, 
            [field]: value,
            sets: [
              { id: 1, reps: '', weight: '' },
              { id: 2, reps: '', weight: '' },
              { id: 3, reps: '', weight: '' }
            ]
          };
        }
        return { ...ex, [field]: value };
      }
      return ex;
    });

    const currentEx = exercises.find(e => e.id === exerciseId);
    if (field === 'type' && !currentEx.type && value) {
      if (updatedExercises[updatedExercises.length - 1].type !== '') {
        updatedExercises.push({
          id: Math.max(...updatedExercises.map(e => e.id)) + 1,
          type: '',
          goal: '',
          sets: []
        });
      }
    }
    setExercises(updatedExercises);
  };

  const handleRemoveExercise = (exerciseId) => {
    const updated = exercises.filter(ex => ex.id !== exerciseId);
    if (updated.length === 0) {
      updated.push({ id: 1, type: '', goal: '', sets: [] });
    }
    setExercises(updated);
  };

  const getTotalVolume = (sets) => {
    if (!sets || sets.length === 0) return 0;
    return sets.reduce((total, s) => {
      const reps = Number(s.reps) || 0;
      const weight = Number(s.weight) || 0;
      return total + (reps * weight);
    }, 0);
  };

  return (
    <div className="record-page" style={{ paddingBottom: '3rem' }}>
      
      {exercises.map((exercise, index) => {
        const totalVolume = getTotalVolume(exercise.sets);
        const goalValue = Number(exercise.goal) || 100;
        const progressPercent = Math.min(100, Math.max(0, (totalVolume / goalValue) * 100)) || 0;

        return (
        <div key={exercise.id} className="record-card">
          <div className="record-card-header">
            <span className="record-exercise-label">Exercise</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {exercise.type && (
                <div className="record-pill">
                  <span className="pill-fill" style={{ width: `${progressPercent}%` }}></span>
                  <span className="pill-text">{totalVolume}/{exercise.goal || 0}</span>
                </div>
              )}
              {exercises.length > 1 && exercise.type && (
                <button 
                  onClick={() => handleRemoveExercise(exercise.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>

          <Select 
            options={exerciseOptions} 
            value={exercise.type}
            onChange={(e) => handleExerciseChange(exercise.id, 'type', e.target.value)}
            defaultLabel="Select Exercise"
            style={{ 
              backgroundColor: '#424242', 
              color: exercise.type ? '#fff' : 'var(--text-muted)', 
              borderRadius: '8px', 
              padding: '0.8rem' 
            }}
          />

          {exercise.type && (
            <>
              <div className="record-table">
                <div className="record-table-header" style={{ gridTemplateColumns: '1fr 2fr 2fr 30px' }}>
                  <div>Set</div>
                  <div>Reps</div>
                  <div>Weight</div>
                  <div></div>
                </div>
                
                {exercise.sets.map((set, i) => (
                  <div key={set.id} className="record-table-row" style={{ gridTemplateColumns: '1fr 2fr 2fr 30px' }}>
                    <div className="set-number">{i + 1}</div>
                    <div className="input-cell">
                      <input 
                        type="number" 
                        className="record-input" 
                        value={set.reps} 
                        onChange={(e) => handleSetChange(exercise.id, set.id, 'reps', e.target.value)}
                      />
                    </div>
                    <div className="input-cell weight-cell">
                      <input 
                        type="number" 
                        className="record-input" 
                        value={set.weight} 
                        onChange={(e) => handleSetChange(exercise.id, set.id, 'weight', e.target.value)}
                      />
                      <span className="unit-label">kg</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <button 
                        onClick={() => handleRemoveSet(exercise.id, set.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--accent-red)', cursor: 'pointer', padding: 0 }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="record-footer">
                <div className="goal-wrapper">
                  <span className="goal-label">Goal :</span>
                  <div className="goal-input-wrapper">
                    <input 
                      type="number" 
                      className="record-input" 
                      value={exercise.goal} 
                      onChange={(e) => handleExerciseChange(exercise.id, 'goal', e.target.value)}
                    />
                    <span className="unit-label">kg</span>
                  </div>
                </div>
                <button className="add-set-btn" onClick={() => handleAddSet(exercise.id)}>
                  + Add Set
                </button>
              </div>
            </>
          )}
        </div>
      )})}

      <div style={{ marginTop: '3rem' }}>
        <Button variant="primary" style={{ padding: '1rem', fontSize: '1rem' }}>
          Save
        </Button>
      </div>

    </div>
  );
}

export default Record;
