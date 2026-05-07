import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ToolCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const ToolCard = ({ id, title, description, icon: Icon, color }: ToolCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Link to={`/tools/${id}`}>
        <Card className="h-full border-2 hover:border-primary/50 transition-colors cursor-pointer group">
          <CardHeader>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} mb-4 text-white shadow-lg group-hover:scale-110 transition-transform`}>
              <Icon className="w-6 h-6" />
            </div>
            <CardTitle className="text-xl group-hover:text-primary transition-colors">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sm leading-relaxed">
              {description}
            </CardDescription>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ToolCard;
