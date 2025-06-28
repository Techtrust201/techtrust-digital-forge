
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Circle, 
  ArrowRight,
  Wand2,
  Video,
  Image as ImageIcon,
  Music,
  Link,
  Calendar,
  Save
} from 'lucide-react';
import { useAdvancedContentCreation } from '@/hooks/useAdvancedContentCreation';
import { useSocialOAuth } from '@/hooks/useSocialOAuth';
import { useContentPersistence } from '@/hooks/useContentPersistence';
import EnhancedContentGenerationStep from './workflow/enhanced/EnhancedContentGenerationStep';
import EnhancedCompositionStep from './workflow/EnhancedCompositionStep';
import SocialConnectionStep from './workflow/SocialConnectionStep';
import SchedulingStep from './workflow/SchedulingStep';
import DraftsStep from './workflow/DraftsStep';

const ContentCreationWorkflow = () => {
  const { workflowState, updateWorkflowState } = useContentPersistence();
  const [currentStep, setCurrentStep] = useState(workflowState.currentStep);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [generatedContent, setGeneratedContent] = useState(workflowState.generatedContent);
  const [compositionData, setCompositionData] = useState(workflowState.compositionData);

  const {
    generateVideoClip,
    generateImage,
    composeFullVideo,
    isGenerating,
    isComposing,
    videoClips,
    generatedImages,
    schedulePost,
    saveDraft,
    loadDrafts,
    drafts
  } = useAdvancedContentCreation();

  const {
    platforms: socialConnections,
    connectPlatform,
    disconnectPlatform,
    publishToplatform
  } = useSocialOAuth();

  useEffect(() => {
    loadDrafts();
  }, [loadDrafts]);

  // Update workflow state when step changes
  useEffect(() => {
    updateWorkflowState({ 
      currentStep, 
      generatedContent, 
      compositionData 
    });
  }, [currentStep, generatedContent, compositionData, updateWorkflowState]);

  const steps = [
    {
      id: 1,
      title: "Génération du contenu",
      description: "Créer vidéos ou images avec l'IA",
      icon: Wand2,
      color: "text-purple-600"
    },
    {
      id: 2,
      title: "Composition & Post-production",
      description: "Sous-titres, musique, montage",
      icon: Music,
      color: "text-blue-600"
    },
    {
      id: 3,
      title: "Connexions sociales",
      description: "Lier vos comptes réseaux sociaux",
      icon: Link,
      color: "text-green-600"
    },
    {
      id: 4,
      title: "Planification",
      description: "Programmer ou publier immédiatement",
      icon: Calendar,
      color: "text-orange-600"
    },
    {
      id: 5,
      title: "Brouillons",
      description: "Gérer vos contenus sauvegardés",
      icon: Save,
      color: "text-gray-600"
    }
  ];

  const handleStepComplete = (stepId: number, data?: any) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
    
    if (stepId === 1 && data) {
      setGeneratedContent(data);
    }
    if (stepId === 2 && data) {
      setCompositionData(data);
    }
    
    // Auto-advance to next step
    if (stepId < 4) {
      setCurrentStep(stepId + 1);
    }
  };

  const progressPercentage = (completedSteps.length / 4) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Progression du workflow</span>
            <Badge variant="outline">{completedSteps.length}/4 étapes</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step) => {
              const isCompleted = completedSteps.includes(step.id);
              const isCurrent = currentStep === step.id;
              const StepIcon = step.icon;
              
              return (
                <div
                  key={step.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    isCurrent 
                      ? 'border-blue-500 bg-blue-50' 
                      : isCompleted 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setCurrentStep(step.id)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Circle className={`w-5 h-5 ${isCurrent ? 'text-blue-600' : 'text-gray-400'}`} />
                    )}
                    <StepIcon className={`w-4 h-4 ${step.color}`} />
                  </div>
                  <h3 className="font-medium text-sm">{step.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{step.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Step Content */}
      <div className="min-h-[600px]">
        {currentStep === 1 && (
          <EnhancedContentGenerationStep 
            onComplete={(data) => handleStepComplete(1, data)}
            generateVideoClip={generateVideoClip}
            generateImage={generateImage}
            isGenerating={isGenerating}
            videoClips={videoClips}
            generatedImages={generatedImages}
          />
        )}
        
        {currentStep === 2 && (
          <EnhancedCompositionStep 
            generatedContent={generatedContent}
            onComplete={(data) => handleStepComplete(2, data)}
            composeFullVideo={composeFullVideo}
            isComposing={isComposing}
            videoClips={videoClips}
          />
        )}
        
        {currentStep === 3 && (
          <SocialConnectionStep 
            onComplete={() => handleStepComplete(3)}
            socialConnections={socialConnections.map(p => ({ 
              platform: p.id, 
              connected: p.connected, 
              username: p.username 
            }))}
          />
        )}
        
        {currentStep === 4 && (
          <SchedulingStep 
            generatedContent={generatedContent}
            compositionData={compositionData}
            onComplete={() => handleStepComplete(4)}
            schedulePost={schedulePost}
            socialConnections={socialConnections.map(p => ({ 
              platform: p.id, 
              connected: p.connected, 
              username: p.username 
            }))}
          />
        )}
        
        {currentStep === 5 && (
          <DraftsStep 
            drafts={drafts}
            saveDraft={saveDraft}
            loadDrafts={loadDrafts}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          Précédent
        </Button>
        
        <Button 
          onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
          disabled={currentStep === 5}
          className="flex items-center gap-2"
        >
          Suivant <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ContentCreationWorkflow;
