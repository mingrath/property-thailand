"use client";

import { Phone, Mail, MessageCircle } from "lucide-react";
import type { Agent } from "@/types/property";

interface AgentContactCardProps {
  agent: Agent;
}

export default function AgentContactCard({ agent }: AgentContactCardProps) {
  return (
    <div className="sticky top-20 bg-white border border-gray-100 rounded-2xl shadow-lg p-6 space-y-5">
      {/* Agent info */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-brand-gold/20 flex items-center justify-center flex-shrink-0">
          {agent.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={agent.avatar_url}
              alt={agent.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-2xl font-heading font-bold text-brand-gold">
              {agent.name.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <h3 className="font-heading font-bold text-brand-dark text-lg leading-tight">
            {agent.name}
          </h3>
          {agent.company && (
            <p className="text-sm text-brand-slate">{agent.company}</p>
          )}
          <p className="text-xs text-gray-400 mt-0.5">
            {agent.listing_count} active listings
          </p>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Contact buttons */}
      <div className="space-y-3">
        {agent.phone && (
          <a
            href={`tel:${agent.phone}`}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-brand-gold hover:bg-brand-gold-dark text-white font-semibold rounded-xl transition-colors"
          >
            <Phone className="w-4 h-4" />
            {agent.phone}
          </a>
        )}
        {agent.email && (
          <a
            href={`mailto:${agent.email}`}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-brand-dark hover:bg-brand-dark/90 text-white font-semibold rounded-xl transition-colors"
          >
            <Mail className="w-4 h-4" />
            Send Email
          </a>
        )}
        <button className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors">
          <MessageCircle className="w-4 h-4" />
          LINE
        </button>
      </div>

      {/* Agent bio snippet */}
      {agent.bio_en && (
        <p className="text-xs text-brand-slate leading-relaxed line-clamp-3 pt-1 border-t border-gray-50">
          {agent.bio_en}
        </p>
      )}
    </div>
  );
}
