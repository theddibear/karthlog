import React, { useState } from "react";
import Button from "../Button";
import { PlusIcon, XIcon } from "lucide-react";
import { ICard } from "@/utils/types";

interface CardFormProps {
  onSubmit: (cardData: Partial<ICard>) => void;
  initialData?: ICard;
  onCancel?: () => void;
}

const CardForm = ({ onSubmit, initialData, onCancel }: CardFormProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [cowrieAmount, setCowrieAmount] = useState(
    initialData?.cowrieAmount || 0
  );
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [type, setType] = useState<"STANDARD" | "PREMIUM" | "LIMITED">(
    initialData?.type || "STANDARD"
  );
  const [benefits, setBenefits] = useState<string[]>(
    initialData?.benefits || [""]
  );
  const handleAddBenefit = () => {
    setBenefits([...benefits, ""]);
  };
  const handleRemoveBenefit = (index: number) => {
    const newBenefits = [...benefits];
    newBenefits.splice(index, 1);
    setBenefits(newBenefits);
  };
  const handleBenefitChange = (index: number, value: string) => {
    const newBenefits = [...benefits];
    newBenefits[index] = value;
    setBenefits(newBenefits);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out empty benefits
    const filteredBenefits = benefits.filter(
      (benefit) => benefit.trim() !== ""
    );
    onSubmit({
      name,
      description,
      cowrieAmount,
      imageUrl,
      type,
      benefits: filteredBenefits,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-abeezee">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-cowrie-bone mb-1"
        >
          Card Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-forged-black border border-antique-brass/30 rounded-lg py-2 px-3 text-cowrie-bone focus:outline-none focus:border-antique-brass text-sm"
          placeholder="Enter card name"
          required
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-cowrie-bone mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full bg-forged-black border border-antique-brass/30 rounded-lg py-2 px-3 text-cowrie-bone focus:outline-none focus:border-antique-brass text-sm"
          placeholder="Enter card description"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="cowrieAmount"
            className="block text-sm font-medium text-cowrie-bone mb-1"
          >
            Cowrie Amount
          </label>
          <input
            id="cowrieAmount"
            type="number"
            min="0"
            value={cowrieAmount}
            onChange={(e) => setCowrieAmount(Number(e.target.value))}
            className="w-full bg-forged-black border border-antique-brass/30 rounded-lg py-2 px-3 text-cowrie-bone focus:outline-none focus:border-antique-brass text-sm"
            placeholder="Enter Cowrie value"
            required
          />
        </div>
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-cowrie-bone mb-1"
          >
            Card Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) =>
              setType(e.target.value as "STANDARD" | "PREMIUM" | "LIMITED")
            }
            className="w-full bg-forged-black border border-antique-brass/30 rounded-lg py-2 px-3 text-cowrie-bone focus:outline-none focus:border-antique-brass text-sm"
            required
          >
            <option value="STANDARD">STANDARD</option>
            <option value="PREMIUM">PREMIUM</option>
            <option value="LIMITED">LIMITED</option>
          </select>
        </div>
      </div>
      <div>
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium text-cowrie-bone mb-1"
        >
          Image URL
        </label>
        <input
          id="imageUrl"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full bg-forged-black border border-antique-brass/30 rounded-lg py-2 px-3 text-cowrie-bone focus:outline-none focus:border-antique-brass text-sm"
          placeholder="Enter image URL"
          required
        />
      </div>
      {/* Card Preview */}
      {imageUrl && (
        <div>
          <p className="text-sm font-medium text-cowrie-bone mb-1">
            Image Preview
          </p>
          <div className="w-full max-w-[200px] aspect-[3/4] rounded-lg overflow-hidden border border-antique-brass/30">
            <img
              src={imageUrl}
              alt="Card preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/400x600/1C1C1C/F0EAD6?text=Invalid+Image+URL";
              }}
            />
          </div>
        </div>
      )}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="block text-sm font-medium text-cowrie-bone">
            Card Benefits
          </label>
          <button
            type="button"
            onClick={handleAddBenefit}
            className="text-antique-brass text-sm flex items-center hover:text-antique-brass/80"
          >
            <PlusIcon size={14} className="mr-1" />
            Add Benefit
          </button>
        </div>
        <div className="space-y-2">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center">
              <input
                type="text"
                value={benefit}
                onChange={(e) => handleBenefitChange(index, e.target.value)}
                className="flex-grow bg-forged-black border border-antique-brass/30 rounded-lg py-2 px-3 text-cowrie-bone focus:outline-none focus:border-antique-brass text-sm"
                placeholder={`Benefit ${index + 1}`}
              />
              {benefits.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveBenefit(index)}
                  className="ml-2 text-cowrie-bone/70 hover:text-red-500"
                >
                  <XIcon size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        {onCancel && (
          <Button
            variant="outline"
            onClick={onCancel}
            className="cursor-pointer"
          >
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary" className="cursor-pointer">
          {initialData ? "Update Card" : "Create Card"}
        </Button>
      </div>
    </form>
  );
};

export default CardForm;
