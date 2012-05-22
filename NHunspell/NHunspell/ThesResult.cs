// --------------------------------------------------------------------------------------------------------------------
// <copyright file="ThesResult.cs" company="Maierhofer Software and the Hunspell Developers">
//   (c) by Maierhofer Software an the Hunspell Developers
// </copyright>
// <summary>
//   Holds the result of a  synonym lookup
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace NHunspell
{
    using System.Collections.Generic;

    /// <summary>
    /// Holds the result of a <see cref="MyThes"/> synonym lookup
    /// </summary>
    public class ThesResult
    {
        #region Constants and Fields

        /// <summary>
        /// The generated by stem.
        /// </summary>
        private readonly bool generatedByStem;

        /// <summary>
        /// The meanings.
        /// </summary>
        private readonly List<ThesMeaning> meanings;

        #endregion

        #region Constructors and Destructors

        /// <summary>
        /// Initializes a new instance of the <see cref="ThesResult"/> class.
        /// </summary>
        /// <param name="meanings">
        /// The meanings.
        /// </param>
        /// <param name="generatedByStem">
        /// if set to <c>true</c>, the meanings are generated by word stemming.
        /// </param>
        public ThesResult(List<ThesMeaning> meanings, bool generatedByStem)
        {
            this.meanings = meanings;
            this.generatedByStem = generatedByStem;
        }

        #endregion

        #region Properties

        /// <summary>
        /// Gets a value indicating whether the meanings are generated by word stemming.
        /// </summary>
        /// <value>
        /// 	<c>true</c> if the meanings are generated by word stemming; otherwise, <c>false</c>.
        /// </value>
        public bool IsGenerated
        {
            get
            {
                return this.generatedByStem;
            }
        }

        /// <summary>
        /// Gets the meanings.
        /// </summary>
        /// <value>The meanings.</value>
        public List<ThesMeaning> Meanings
        {
            get
            {
                return this.meanings;
            }
        }

        #endregion
    }
}