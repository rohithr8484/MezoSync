import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileCode2, Shield, Zap, CheckCircle2 } from 'lucide-react';
import { CONTRACT_INFO } from '@/lib/contracts';

const ContractStatus = () => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <FileCode2 className="h-4 w-4 text-primary" />
          Smart Contracts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Payments Contract */}
        <div className="p-3 rounded-lg bg-background/50 border border-border/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              <span className="font-medium text-sm">{CONTRACT_INFO.payments.name}</span>
            </div>
            <Badge variant="outline" className="text-xs bg-green-500/10 text-green-500 border-green-500/30">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Active
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            {CONTRACT_INFO.payments.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {Object.keys(CONTRACT_INFO.payments.functions).map((fn) => (
              <Badge key={fn} variant="secondary" className="text-[10px] font-mono">
                {fn}()
              </Badge>
            ))}
          </div>
        </div>

        {/* Bills Contract */}
        <div className="p-3 rounded-lg bg-background/50 border border-border/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-sm">{CONTRACT_INFO.bills.name}</span>
            </div>
            <Badge variant="outline" className="text-xs bg-green-500/10 text-green-500 border-green-500/30">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Active
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            {CONTRACT_INFO.bills.description}
          </p>
          <div className="flex flex-wrap gap-1 mb-2">
            {Object.entries(CONTRACT_INFO.bills.types).map(([key, desc]) => (
              <Badge key={key} variant="outline" className="text-[10px]">
                {key}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {Object.keys(CONTRACT_INFO.bills.functions).slice(0, 4).map((fn) => (
              <Badge key={fn} variant="secondary" className="text-[10px] font-mono">
                {fn}()
              </Badge>
            ))}
          </div>
        </div>

        {/* Contract Info */}
        <div className="text-[11px] text-muted-foreground flex items-center gap-1">
          <Shield className="h-3 w-3" />
          Contracts secured with ReentrancyGuard
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractStatus;
